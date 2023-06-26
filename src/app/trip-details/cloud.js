

const moment = require('moment');
const crypto = require('crypto');
const Lazy = require('lodash');
const { parse } = require('path');


Parse.Cloud.define('importData', async (request) => {
    var myData = request.params.Malaga;
    var clubs = Parse.Object.extend("clubs");
    for (let c of myData) {
        var club = new clubs();
        club.set('category', c['Actividad']);
        club.set('name', c['Nombre']);
        club.set('address', c['Direccion']);
        club.set('phone', "" + c['Telefono']);
        club.set('web', c['web']);
        club.set('email', c['Correo']);
        club.set('type', "" + c['type']);
        club.set('aproved', "" + c['aproved']);
        var str = c['location'];
        str = str.trim();
        var res = str.split(",");
        club.set('lat', res[0]);
        club.set('lng', res[1]);

        await club.save();
    }

    return true;

});




async function getRoutingForTrip(tData) {

    let tripData = {};

    let startAddress = JSON.parse(tData.get('yourAddress'));
    let dest = tData.get('destinationAcademia');
    await dest.fetch();

    let stops = tData.get('stops');
    let shipments = [];

    for (let s of stops) {
        let rand_int1 = Math.floor(Math.random() * 10000);
        shipments.push(
            {
                "id": "" + rand_int1,
                "name": "" + s.user.objectId,
                "priority": 1,
                "pickup": {
                    "address": {
                        "location_id": "" + s.address.lat + s.address.lng,
                        "lon": parseFloat(s.address.lng),
                        "lat": parseFloat(s.address.lat)
                    }
                },
                "delivery": {
                    "address": {
                        "location_id": "" + dest.get('lat') + dest.get('lng'),
                        "lon": parseFloat(dest.get('lng')),
                        "lat": parseFloat(dest.get('lat'))
                    }
                },
                "size": [
                    1
                ],
                "required_skills": []
            }

        )


    }

    return await Parse.Cloud.httpRequest({
        method: 'POST',
        url: 'https://graphhopper.com/api/1/vrp?key=YOUR_KEY_HERE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: {
            'vehicles': [{
                "vehicle_id": "vehicle-1",
                "type_id": "car",
                "return_to_depot": false,
                "start_address": {
                    "location_id": startAddress.name,
                    "lon": startAddress.lng,
                    "lat": startAddress.lat
                },
                "earliest_start": 0,
                "latest_end": moment(tData.get("arrivalTime")).valueOf(),
                "max_jobs": 10
            }],

            'vehicle_types': [
                {
                    "type_id": "car",
                    "capacity": [
                        100
                    ],
                    "profile": "car"
                }
            ],
            'services': [],
            'shipments': shipments,
            'objectives': [
                {
                    "type": "min",
                    "value": "completion_time"
                }
            ],
            "configuration": {
                "routing": {
                    "calc_points": true,
                    "consider_traffic": true,
                    "snap_preventions": [

                    ]
                }
            }

        }
    }).then(function (httpResponse) {
        return httpResponse.text;
    }, function (httpResponse) {
        console.error('Request failed with response code ' + httpResponse.status);
    });
}

async function sendNotification(destination, text) {

    var query = new Parse.Query(Parse.Installation);
    query.equalTo('user', destination);


    await Parse.Push.send({
        where: query,
        data: {
            alert: text,
            badge: 1,
            sound: 'default'
        }
    }, { useMasterKey: true })
        .then(function () { });


}

Parse.Cloud.define('startTrip', async function (req) {

    const GameScore = Parse.Object.extend("trips");
    const query = new Parse.Query(GameScore);
    query.equalTo("objectId", req.params.tripID);
    const results = await query.find();
    var mTrip = results[0];
    var participants = mTrip.get("participants");
    var user = req.user;
    for (let m of participants) {
        if (m.id != user.id) {
            sendNotification(m, user.get("name") + " está en camino! ¡Prepárense!");
        }
    }
})

Parse.Cloud.define('endTrip', async function (req) {
    const GameScore = Parse.Object.extend("trips");
    const query = new Parse.Query(GameScore);
    query.equalTo("objectId", req.params.tripID);
    const results = await query.find();
    var mTrip = results[0];
    var participants = mTrip.get("participants");
    var user = req.user;
    for (let m of participants) {
        if (m.id != user.id) {
            sendNotification(m, "¡Su hijo/a ha llegado a su destino!");
        }
    }


})

Parse.Cloud.define('savePassReset', async function (request) {
    var email = request.params.email;
    var newPass = request.params.newPass;
    var passCode = request.params.passCode;
    var query = new Parse.Query(Parse.User);
    query.equalTo('email', email)
    query.find({ useMasterKey: true }).then(res => {
        var myUser = res[0];
        if (myUser.get('passCode') == passCode)
            myUser.set('password', newPass);
        myUser.save(null, { useMasterKey: true });
    });


})

Parse.Cloud.define("deleteUserAccount", function (request, response) {
    var User = Parse.Object.extend("User");
    var query = new Parse.Query(User);
    var userID = request.params.userID;
    query.get(userID, {
        success: function (User) {
            var message = 'success';

            User.destroy({
                useMasterKey: true,
                success: function () {
                    response.success(message);
                    return;
                },
                error: function (error) {
                    response.error('Could not delete object ' + User.id);
                    return;
                }
            });
        },
        error: function (object, error) {
            var message = 'User could not found';
            response.error(message);
        }
    });
});

Parse.Cloud.define('requestPassReset', async function (request) {
    var email = request.params.email;
    var a = Math.floor(100000 + Math.random() * 900000);
    a = String(a);
    a = a.substring(0, 4);

    var query = new Parse.Query(Parse.User);
    query.equalTo('email', email)
    var res = await query.find({ useMasterKey: true });

    if (res.length > 0) {
        var myUser = res[0];
        myUser.set('passCode', a);
        myUser.save(null, { useMasterKey: true }).then(
            async res => {
                await Parse.Cloud.httpRequest({
                    method: 'POST',
                    url: 'https://api.sendmachine.com/mail/send',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Basic AUTHORIZATION_CODE',
                        'Accept': 'application/json'

                    },
                    body: {
                        "personalization": [
                            {
                                "to": [
                                    {
                                        "email": "" + email
                                    }
                                ],
                                "macros": {
                                    "EMAILCODE": "" + a
                                }
                            }
                        ],
                        "message": {
                            "from": {
                                "email": "no-reply@YOUR_DOMAIN"
                            },
                            "subject": "Restablecimiento de contraseña",
                            "template_id": "poyxobql"
                        }


                    }
                }).then(function (httpResponse) {

                }, function (httpResponse) {


                    console.error('Request failed with response code ' + httpResponse.status);
                });
            });
        return true;
    }

    else {

        return false;
    }

});





Parse.Cloud.afterSave("messages", async (request) => {

    var user = request.user;
    var type = request.object.get('type');
    var content = "Nueva notificación de " + user.get("name");
    if (type == 'text') {

        content = "Nuevo mensaje de " + user.get("name") + ": " + request.object.get('content');

    }
    var convers = request.object.get('conversation');
    await convers.fetch();
    var members = convers.get('members');
    for (let m of members) {
        if (m.id != user.id) {
            if (type != "empty")
                sendNotification(m, content);
        }
    }

})



Parse.Cloud.beforeSave(Parse.User, async (request) => {
    if (request.object.get('approved') != 1) {
        var a = Math.floor(100000 + Math.random() * 900000);
        a = String(a);
        a = a.substring(0, 4);
        request.object.set("UCode", a);

        await Parse.Cloud.httpRequest({
            method: 'POST',
            url: 'https://api.sendmachine.com/mail/send',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic AUTHORIZATION_CODE',
                'Accept': 'application/json'

            },
            body: {
                "personalization": [
                    {
                        "to": [
                            {
                                "email": "" + request.object.get('email')
                            }
                        ],
                        "macros": {
                            "EMAILCODE": "" + a
                        }
                    }
                ],
                "message": {
                    "from": {
                        "email": "no-reply@movilidadparafamilias.com"
                    },
                    "subject": "Código de verificación Childfy",
                    "template_id": "ijlmsmha"
                }


            }
        }).then(function (httpResponse) {

        }, function (httpResponse) {
            console.error('Request failed with response code ' + httpResponse.status);
        });

    }
})


Parse.Cloud.beforeSave("trips", async (request) => {

    await getRoutingForTrip(request.object).then(res => {

        request.object.set("trip", res);
    });
});



Parse.Cloud.define('getSugestions', function (req) {

    let query = "";
    return Parse.Cloud.httpRequest({
        method: 'GET',
        url: 'https://graphhopper.com/api/1/geocode?q=' + query + '&locale=es&debug=true&key=YOUR_KEY',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        }
    }).then(function (httpResponse) {
        return httpResponse;
    }, function (httpResponse) {
        console.error('Request failed with response code ' + httpResponse.status);
    });


});


Parse.Cloud.define('generateContract', function (req) { return 'Hi, git'; });


Parse.Cloud.define('updateTrip', function (req) { return 'Hi, git'; });


Parse.Cloud.define('generateTrip', function (req) {




});



Parse.Cloud.define('hello', function (req) { return 'Hi, git'; });



////////Utils///////////////////
function generateNonce() {
    return crypto.randomBytes(32).toString('hex');
}

function getTimestamp() {
    return moment().utcOffset(0).format('YYYYMMDDHHmmss');
}

function signData(data, key) {
    const fields = Lazy(data).keys();

    const valuesString = fields.map((field) => {
        let value = data[field];

        if (value === null || typeof value === 'undefined' || value === '') {
            return '-';
        }

        value = String(value);
        return `${value.length}${value}`;
    }).join('');

    const hmac = crypto.createHmac('md5', Buffer.from(key, 'hex'));

    hmac.update(valuesString);

    return hmac.digest('hex');
}

function clientInfoToGatewayFields(clientInfo, prefix = '') {
    const clientInfoToFieldsMap = {
        firstName: 'fname',
        lastName: 'lname',
        company: 'company',
        address: 'add',
        city: 'city',
        state: 'state',
        zip: 'zip',
        country: 'country',
        phone: 'phone',
        fax: 'fax',
        email: 'email'
    };
    const result = {};

    Lazy(clientInfo).keys().each((field) => {
        if (typeof clientInfoToFieldsMap[field] !== 'undefined') {
            result[`${prefix}${clientInfoToFieldsMap[field]}`] = clientInfo[field];
        }
    });

    return result
}

function prepareAuthorizationRequestData(params) {
    return new Promise((resolve, reject) => {

        if (!params.amount) {
            return reject(new Error('Amount is required'));
        }

        const requestData = {
            amount: params.amount || '0.00',
            curr: params.currency || 'RON',
            invoice_id: params.invoiceId || '',
            order_desc: params.orderDescription || '',
            merch_id: merchantId || '',
            timestamp: getTimestamp(),
            nonce: generateNonce(),
        };

        requestData['fp_hash'] = signData(requestData, secretKey);

        if (params.billingDetails) {
            Object.assign(requestData, clientInfoToGatewayFields(params.billingDetails));
        }

        if (params.shippingDetails) {
            Object.assign(requestData, clientInfoToGatewayFields(params.shippingDetails));
        }

        if (params.extraData) {
            requestData.ExtraData = params.extraData;
        }

        return resolve(requestData);
    });
}
function http_build_query(jsonObj) {
    const keys = Object.keys(jsonObj);
    const values = keys.map(key => jsonObj[key]);

    return keys
        .map((key, index) => {
            return `${key}=${values[index]}`;
        })
        .join("&");
};
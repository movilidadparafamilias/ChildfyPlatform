import { Injectable, NgZone } from '@angular/core';
import Parse from 'parse';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoadingController, ToastController, AlertController, Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Push } from '@ionic-native/push/ngx';
import { Router } from '@angular/router';

declare let window: any;

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  private parseAppId: string = "YOUR_APP_ID";
  private parseServerUrl: string = "YOUR_SERVER_URL";
  private parseMaster: string = "YOUR_MASTER_STRING";
  public static showBadge = false;



  pageLimit = 10;

  constructor(
    public loadingController: LoadingController,
    public toastController: ToastController,
    private pushNotifications: Push,
    private platform: Platform,
    private http: HttpClient,
    private alertController: AlertController,
    private translate: TranslateService,
    private router: Router,
    private zone: NgZone) { this.parseInitialize(); }

  private parseInitialize() {
    Parse.initialize(this.parseAppId, '', this.parseMaster);
    Parse.serverURL = this.parseServerUrl;
    Parse.publicServerURL = this.parseServerUrl;

    this.checkLng();
    this.registerPush();
  }

  public async getLng() {
    return this.translate.defaultLang;
  }

  public async checkLng() {
    if (Parse.User.current())
      await Parse.User.current().fetch();
    let currentUser = Parse.User.current();
    if (currentUser && currentUser.get("lngCode")) {
      this.translate.setDefaultLang(currentUser.get("lngCode"));
    }
    else {
      this.translate.setDefaultLang("es");
    }
  }



  public async addNewClubWithCode(cCode) {

    let myres = 1;
    let loading;
    await this.translate.get(['Verifying...']).subscribe(
      async res => {
        loading = await this.loadingController.create({
          message: res['Verifying...'],
        });
        await loading.present();
      })

    let theClubs = await this.searchClubWIthCode(cCode);



    if (theClubs.length > 0) {
      let user = await this.getUserDetails();
      let myClubsList = user.get("myClubs");
      if (!myClubsList) {
        myClubsList = [];
      }

      myClubsList.push(theClubs[0]);
      user.set("myClubs", myClubsList);
      await user.save();
      loading.dismiss();
      myres = 1;
    }
    else {
      loading.dismiss();
      myres = 0;
    }
    return myres
  }


  async searchClubWIthCode(cCode) {
    const GameScore = Parse.Object.extend("clubs");
    const query = new Parse.Query(GameScore);
    query.limit(1);
    query.equalTo("uCode", cCode);
    const results = await query.find();
    return results;
  }

  public async verifyCode(pincode) {
    const loading = await this.loadingController.create({
      message: 'Verifying...',
    });
    await loading.present();
    await Parse.User.current().fetch();
    let currentUser = Parse.User.current();
    if (currentUser.get('UCode') == pincode) {
      loading.dismiss();
      this.registerPush();
      return true;
    }
    else {
      loading.dismiss();
      return false;
    }
  }

  public async approveUser() {
    await Parse.User.current().fetch();
    let currentUser = Parse.User.current();
    currentUser.set('approved', 1);
    currentUser.save().then(res => {
      return true;
    });
  }

  public setLng(lnCode) {
    let currentUser = Parse.User.current();
    if (currentUser) {
      currentUser.set("lngCode", lnCode);
      currentUser.save();
    }
    this.translate.setDefaultLang(lnCode);
  }


  public async signup(signUpData) {
    if (signUpData.email.length > 0 && signUpData.password.length > 0 && signUpData.name.length > 0 && signUpData.rePassword.length > 0) {
      if (signUpData.password == signUpData.rePassword) {
        const loading = await this.loadingController.create({
          message: 'Creating account...',
        });

        await loading.present();
        let user = new Parse.User();
        user.set("username", signUpData.email);
        user.set("password", signUpData.password);
        user.set("name", signUpData.name);
        user.set("email", signUpData.email);
        user.set("UCode", "1234");
        user.set("type", 1);
        user.set("lngCode", "es");
        user.set("approved", 0);
        user.set("myClubs", []);
        try {
          await user.signUp();
          loading.dismiss();
          this.askTrackingPermission();
          return true;
        } catch (error) {
          loading.dismiss();
          const toast = await this.toastController.create({
            position: 'middle',
            message: 'Something went wron please try again',
            duration: 2000
          });
          toast.present();
          return false;
        }
      }
      else {

        const toast = await this.toastController.create({
          position: 'middle',
          message: 'Passwords must match',
          duration: 2000
        });
        toast.present();


        return false;
      }

    }

    else {

      const toast = await this.toastController.create({
        position: 'middle',
        message: 'Sign up details can not be empty',
        duration: 2000
      });
      toast.present();
      return false;

    }


  }

  askTrackingPermission() {
    if (this.platform.is('cordova') && this.platform.is('ios')) {

      if (window.cordova) {
        window.cordova.exec(win, fail, 'idfa', "requestPermission", []);
      }
    }
    return true;
    function win(res) {
      console.log('success ' + JSON.stringify(res));
    }
    function fail(res) {
      console.log('fail ' + JSON.stringify(res));
    }
  }

  readTrackingPermission() {

    if (this.platform.is('cordova') && this.platform.is('ios')) {

      if (window.cordova) {
        window.cordova.exec(win, fail, 'idfa', "getInfo", []);
      }
    }

    function win(res) {
      console.log('success  ' + JSON.stringify(res));
    }
    function fail(res) {
      console.log('fail ' + JSON.stringify(res));
    }
  }

  registerPush() {
    let install = new Parse.Installation();
    const push = this.pushNotifications.init({
      android: {
      },
      ios: {
        alert: "true",
        badge: true,
        sound: 'false'
      },
      windows: {}
    });

    push.on('notification').subscribe(async (notification: any) => {
      this.zone.run(() => {
        ConnectionService.showBadge = true;
      });
      const toast = await this.toastController.create({
        message: notification.message,
        position: 'top',
        duration: 4000
      });
      toast.present();

      if (!notification.additionalData.foreground) {
        this.router.navigate(['/tabs/messages']);

      } else {

      }

    });

    push.on('registration').subscribe((registration: any) => {
      if (this.platform.is('android')) {
        install.set("deviceType", 'android');
      }
      if (this.platform.is('ios')) {
        install.set("deviceType", 'ios');
      }
      let installationController = Parse.CoreManager.getInstallationController();
      installationController.currentInstallationId().then(function (iid) {

        install.set('appIdentifier', 'com.mpf.childfy');
        install.set("deviceToken", registration.registrationId);
        // add the gcm id to the installation object
        install.set("GCMSenderId", '');
        install.set("appName", 'CHILDFY');
        install.set("installationId", iid);
        install.set("user", Parse.User.current());
        install.save(null, {
          success: (install) => { console.log(install); },
          error: (install, error) => {
            console.log('Failed to create new object, with error code:' + error.message.toString());
          }
        })
      });
    });
    push.on('error').subscribe(error => console.error('Error with Push plugin', error));
  }

  public async logout() {
    await Parse.User.logOut();
  }

  public async login(loginData) {
    if (loginData.email.length > 0 && loginData.password.length > 0) {
      loginData.email = loginData.email.replace(/ /g, "");
      let loading;
      this.translate.get(['Authenticating...']).subscribe(
        async res => {
          loading = await this.loadingController.create({
            message: res['Authenticating...'],
          });
          await loading.present();
        })

      try {
        await Parse.User.logIn(loginData.email, loginData.password);

        loading.dismiss();
        this.registerPush();
        localStorage.setItem("resetEmail", "");
        this.checkLng();

        return true;
      } catch (error) {
        loading.dismiss();
        this.translate.get(['Please check login details']).subscribe(
          async res => {
            const toast = await this.toastController.create({
              position: 'middle',
              message: res['Please check login details'],
              duration: 2000
            });
            toast.present();

          })
        return false;
      }
    }
    else {

      this.translate.get(['Login details can not be empty']).subscribe(
        async res => {
          const toast = await this.toastController.create({
            position: 'middle',
            message: res['Login details can not be empty'],
            duration: 2000
          });
          toast.present();
        })
      return false;
    }
  }


  public async isParent() {
    let currentUser = Parse.User.current();
    if (currentUser && currentUser.get("type") == 1) { return true; }
    else { return false; }
  }

  public async isAdmin() {
    let currentUser = Parse.User.current();
    if (currentUser && currentUser.get("type") == 2) return true;
    else return false;
  }

  public async isClub() {
    let currentUser = Parse.User.current();
    if (currentUser && currentUser.get("type") == 3) return true;
    else return false;
  }

  public async getUserById(id) {
    const query = new Parse.Query(Parse.User);
    query.equalTo("objectId", id);
    const result = await query.find();

    return result;
  }


  public async startTrip(trip) {
    const params = { tripID: trip.id };
    Parse.Cloud.run("startTrip", params);
  }


  public async endTrip(trip) {
    const params = { tripID: trip.id };
    Parse.Cloud.run("endTrip", params);
  }

  public async getUserDetails() {
    if (Parse.User.current())
      await Parse.User.current().fetch();
    return await Parse.User.current();
  }

  public async searchAcademia(searchTerm) {
    var GameScore = Parse.Object.extend("clubs");
    var query = new Parse.Query(GameScore);
    query.fullText('name', searchTerm);
    const results = await query.find();
    return results;
  }

  public async searchAddress(query) {
    let result = [];
    return result;
  }

  handleParseError(err) {
    switch (err.code) {
      case Parse.Error.INVALID_SESSION_TOKEN:
        Parse.User.logOut();
        break;
    }
  }


  public async requestTrip(tripData) {
    const loading = await this.loadingController.create({
      message: 'Creating trip...',
    });

    await loading.present();
    var trips = Parse.Object.extend("trips");
    var trip = new trips();

    trip.set('yourAddress', JSON.stringify(tripData.myAddresses));
    trip.set('destinationAcademia', tripData.academia);
    trip.set('date', tripData.date);
    trip.set('departTime', tripData.departTime);
    trip.set('arrivalTime', tripData.arrivalTime);
    trip.set('freeSeats', tripData.freeSeats);
    trip.set('frequency', tripData.frequency);
    trip.set('recurentOn', tripData.recurent);
    trip.set('participants', [Parse.User.current()]);
    trip.set('stops', [{ user: Parse.User.current(), address: tripData.myAddresses }]);
    trip.set('driver', null);

    trip.save().then(res => {
      loading.dismiss();
    })

  }

  public async createTrip(tripData) {
    const loading = await this.loadingController.create({
      message: 'Creating trip...',
    });

    await loading.present();
    var trips = Parse.Object.extend("trips");
    var trip = new trips();
    var startPoint = new Parse.GeoPoint({ latitude: tripData.myAddresses.lat, longitude: tripData.myAddresses.lng });
    trip.set('yourAddress', JSON.stringify(tripData.myAddresses));
    trip.set('destinationAcademia', tripData.academia);
    trip.set('date', tripData.date);
    trip.set('departTime', tripData.departTime);
    trip.set('arrivalTime', tripData.arrivalTime);
    trip.set('freeSeats', tripData.freeSeats);
    trip.set('frequency', tripData.frequency);
    trip.set('recurentOn', tripData.recurent);
    trip.set('participants', [Parse.User.current()]);
    trip.set('stops', [{ user: Parse.User.current(), address: tripData.myAddresses }]);
    trip.set('driver', Parse.User.current());
    trip.set('startPoint', startPoint);
    trip.save().then(res => {
      loading.dismiss();
    })

  }

  public async joinTrip(trip, requestData) {

    const loading = await this.loadingController.create({
      message: 'Sending join request...',

    });
    await loading.present();
    var driver = trip.get('driver');
    const conversations = Parse.Object.extend("conversation");
    var conv = new conversations();
    conv.set("members", [driver, Parse.User.current()]);
    conv.set("trip", trip);
    conv.set("status", 1); //requested
    conv.set("persData", requestData)
    await conv.save().then(res => {
      const message = Parse.Object.extend("messages");
      var newM = new message();
      newM.set("type", "requestCard");
      newM.set("content", "");
      newM.set("conversation", res);
      newM.set("sender", Parse.User.current());
      newM.save().then(res => {
        loading.dismiss();
        return true;
      });
    })
  }

  public async getMyTrips(page) {
    const loading = await this.loadingController.create({
      message: 'Cargando...',
    });
    await loading.present();
    const GameScore = Parse.Object.extend("trips");
    const query = new Parse.Query(GameScore);
    query.limit(10);
    query.notEqualTo("pstate", 2);
    query.descending("createdAt");
    query.equalTo("participants", Parse.User.current());
    query.skip(page * this.pageLimit);
    return await query.find().then((res) => {
      loading.dismiss();
      return res;
    }, (err) => { this.handleParseError(err); });

  }


  public async getClubs(page) {
    const GameScore = Parse.Object.extend("clubs");
    const query = new Parse.Query(GameScore);
    query.limit(10);
    query.descending("createdAt");
    query.skip(page * this.pageLimit);
    const results = await query.find();
    return results;
  }

  public async aproveJoinTrip() {

  }

  public async rejectJoinTrip() {


  }


  public async saveNewPassword(email, pass, code) {
    const params = { email: email, newPass: pass, passCode: code };
    Parse.Cloud.run("savePassReset", params);

  }

  public async startResetPassword(email) {
    const params = { email: email };
    var res = await Parse.Cloud.run("requestPassReset", params);
    return res;
  }

  public async getConverstioByID(id) {

    const GameScore = Parse.Object.extend("conversation");
    const query = new Parse.Query(GameScore);
    query.limit(1);
    query.descending("createdAt");
    query.equalTo("objectId", id);
    const results = await query.find();
    return results[0];
  }

  public async getConversations(page) {
    const loading = await this.loadingController.create({
      message: 'Cargando...',
    });
    await loading.present();
    const GameScore = Parse.Object.extend("conversation");
    const query = new Parse.Query(GameScore);
    query.limit(10);
    query.descending("createdAt");
    query.equalTo("members", Parse.User.current());
    query.notEqualTo("Archive", Parse.User.current());
    query.skip(page * this.pageLimit);
    const results = await query.find();
    loading.dismiss();
    return results;
  }


  public async getConversationsArchive(page) {
    const loading = await this.loadingController.create({
      message: 'Cargando...',
    });
    await loading.present();
    const GameScore = Parse.Object.extend("conversation");
    const query = new Parse.Query(GameScore);
    query.limit(10);
    query.descending("createdAt");
    query.equalTo("members", Parse.User.current());
    query.equalTo("Archive", Parse.User.current());
    query.skip(page * this.pageLimit);
    const results = await query.find();
    loading.dismiss();
    return results;
  }


  public async getLastMessagesForConversation(conversation) {

    const GameScore = Parse.Object.extend("messages");
    const query = new Parse.Query(GameScore);
    query.descending("createdAt");
    query.equalTo("conversation", conversation);
    query.limit(1);
    const results = await query.find();

    return results;
  }


  public async getMessagesForConversation(conversation) {
    const loading = await this.loadingController.create({
      message: 'Cargando...',
    });
    await loading.present();
    const GameScore = Parse.Object.extend("messages");
    const query = new Parse.Query(GameScore);
    query.ascending("createdAt");
    query.equalTo("conversation", conversation);

    const results = await query.find();
    loading.dismiss();
    return results;
  }



  public async subscribeToConversation(conversation) {

    let query = new Parse.Query('messages');
    query.equalTo("conversation", conversation);
    let subscription = await query.subscribe();
    return subscription;


  }

  public async sendRejectCard(conversation) {
    const message = Parse.Object.extend("messages");
    var newM = new message();
    newM.set("type", "rejectCard");
    newM.set("content", "");
    newM.set("conversation", conversation);
    newM.set("sender", Parse.User.current());
    newM.save().then(res => {
    });
  }

  public async sendAproveCard(conversation) {
    const message = Parse.Object.extend("messages");
    var newM = new message();
    newM.set("type", "aproveCard");
    newM.set("content", "");
    newM.set("conversation", conversation);
    newM.set("sender", Parse.User.current());
    newM.save().then(res => {
    });
  }

  public async sendEmptyMesage(conversation) {
    const message = Parse.Object.extend("messages");
    var newM = new message();
    newM.set("type", "empty");

    newM.set("conversation", conversation);
    newM.set("sender", Parse.User.current());
    newM.save().then(res => {
    });
  }


  public async sendMesage(conversation, text) {
    const message = Parse.Object.extend("messages");
    var newM = new message();
    newM.set("type", "text");
    newM.set("content", text);
    newM.set("conversation", conversation);
    newM.set("sender", Parse.User.current());
    newM.save().then(res => {
    });
  }

  public async getTripsForAcademia(academia, startPoint) {
    const GameScore = Parse.Object.extend("trips");
    const query = new Parse.Query(GameScore);
    query.descending("createdAt");
    query.equalTo("destinationAcademia", academia);
    query.notEqualTo("pstate", 2);
    if (startPoint) {
      query.withinKilometers("location", startPoint, 5, false);
    }
    const results = await query.find();
    return results;

  }

  public async getAcademiaWith(id) {
    const GameScore = Parse.Object.extend("clubs");
    const query = new Parse.Query(GameScore);
    query.limit(1);
    query.descending("createdAt");
    query.equalTo("objectId", id);
    const results = await query.find();
    return results[0];

  }

  public async getTripWithId(id) {
    const loading = await this.loadingController.create({
      message: 'Cargando...',

    });
    await loading.present();
    const GameScore = Parse.Object.extend("trips");
    const query = new Parse.Query(GameScore);
    query.limit(1);
    query.descending("createdAt");
    query.equalTo("objectId", id);

    const results = await query.find();
    loading.dismiss();
    return results[0];
  }

  public async showAlertWithText(title, text) {
    const alert = await this.alertController.create({
      header: title,
      subHeader: '',
      message: text,
      buttons: ['OK']
    });
    await alert.present();
  }

  public async deleteUserAccount() {
    Parse.Cloud.run("deleteUserAccount").then(() => { this.logout() })
  }

  public async searchLocation(searchQuery) {
    const loading = await this.loadingController.create({
      message: 'Buscando...',
    });
    await loading.present();
    return new Promise(resolve => {

      this.http.get('https://photon.komoot.io/api/?q=' + searchQuery + '', {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/json; charset=utf-8')
      }).subscribe(async res => {
        loading.dismiss();
        let results = res as any;
        let list = [];

        for (let i = 0; i < results.features.length; i++) {
          let item = results.features[i];
          list.push({
            display_name: "" + item.properties.name + " " + item.properties.city + " " + item.properties.county + " " + item.properties.state + " " + item.properties.country,
            lat: item.geometry.coordinates[1],
            lon: item.geometry.coordinates[0],
            address: { road: item.properties.name, city: item.properties.city, postcode: item.properties.postcode, state: item.properties.state }
          })

        }
        if (list.length > 0) {
          resolve(list);
        }
        else {
          const alert = await this.alertController.create({
            header: 'Buscar',
            subHeader: '',
            message: 'Sin resultados. ¡Inténtalo de nuevo!',
            buttons: ['OK']
          });
          await alert.present();
        }
      });

    })
  }
}

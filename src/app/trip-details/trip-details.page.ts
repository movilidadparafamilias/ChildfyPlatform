import { Component, OnInit } from '@angular/core';
import { ConnectionService } from '../services/connection/connection.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, AlertController, NavController } from '@ionic/angular';
import { Map, tileLayer, marker, geoJSON, latLngBounds, icon, Marker } from 'leaflet';
import { JoinTripPage } from '../join-trip/join-trip.page';
import * as moment from 'moment';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.page.html',
  styleUrls: ['./trip-details.page.scss'],
})
export class TripDetailsPage implements OnInit {

  selTrip: any;
  myUser: any;
  academia: any;
  driver: any;
  routeData: any;
  showMap = false;
  geoLayer: any;
  map: Map;
  tripStatus = 0;
  tripStops = [];
  momentjs: any = moment;


  constructor(private conn: ConnectionService, private route: ActivatedRoute, private modalCtrl: ModalController, private alertController: AlertController, private navCtrl: NavController, private translate: TranslateService) {

    this.route.params.subscribe(params => {
      this.getMyTrip(params['id']);

    });

  }

  ionViewWillEnter() {
    this.getUser();
  }

  async getUser() {
    this.myUser = await this.conn.getUserDetails();
  }

  requestAseat() {

  }


  calculateDeparture(tStop) {
    if (this.routeData.solution.routes.length > 0) {

      let r = this.routeData.solution.routes[0].activities;


      let t = moment(this.selTrip.get('arrivalTime')).subtract(this.routeData.solution.completion_time, 's');


      for (let rr of r) {

        if (rr.address.location_id === "" + tStop.address.lat + "" + tStop.address.lng) {

          return t.add(rr.arr_time, "s").format('HH:mm').toString();
        }

      }
    }


    return "00:00";

  }


  goMap() {
    let a = this;
    this.showMap = !this.showMap;
    setTimeout(function () {
      if (a.showMap == true) {
        if (!a.map)
          a.loadMap();
      }

    }, 10);

  }

  loadMap() {

    this.map = new Map("mapId").setView([36.7213028, -4.4216366], 13);
    tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      { attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>' }).addTo(this.map);
    this.geoLayer = geoJSON(this.routeData.solution.routes[0].points, { style: { fillColor: '#0D8C8F', color: '#0D8C8F', weight: 5, opacity: 0.8 } });


    this.geoLayer.addTo(this.map);
    this.map.fitBounds(this.geoLayer.getBounds(), { maxZoom: 17 });
  }



  showRoute() {


  }

  async getMyTrip(id) {
    this.conn.getTripWithId(id).then(res => {
      this.selTrip = res;

      this.routeData = JSON.parse(res.get('trip'));

      this.tripStatus = res.get("status");
      if (!this.tripStatus)
        this.tripStatus = 0;

      this.academia = this.selTrip.get('destinationAcademia');

      this.academia.fetch();

      this.driver = this.selTrip.get('driver');
      this.driver.fetch();

      this.tripStops = this.selTrip.get('stops');
    });

  }

  async startTrip() {
    this.tripStatus = 1;
    this.selTrip.set("status", 1);
    this.selTrip.save();

    this.conn.startTrip(this.selTrip);
  }

  async endTrip() {
    this.tripStatus = 2;
    this.selTrip.set("status", 2);
    this.selTrip.save();
    this.conn.endTrip(this.selTrip);
  }

  async deleteTrip() {

    let a = this;
    this.translate.get(['Confirm', 'Are you sure you want to delete this trip?', 'Add']).subscribe(
      async res => {

        const alert = await this.alertController.create({
          cssClass: 'my-custom-class',
          header: res['Confirm!'],
          message: res['Are you sure you want to delete this trip?'],
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
              cssClass: 'secondary',
              handler: (blah) => {
              }
            }, {
              text: 'OK',
              handler: () => {
                this.selTrip.set('pstate', 2);
                this.selTrip.save().then((myObject) => {


                  this.translate.get(['Success', 'The trip was deleted', 'Add']).subscribe(
                    async res => {
                      const alert = await this.alertController.create({
                        cssClass: '',
                        header: res['Success'],
                        message: res['The trip was deleted'],
                        buttons: [
                          {
                            text: 'OK',
                            role: 'cancel',
                            cssClass: 'secondary',
                            handler: (blah) => {
                              this.navCtrl.back();
                            }
                          }
                        ]
                      });

                      await alert.present();
                    });



                }, (error) => {
                  // The delete failed.
                  // error is a Parse.Error with an error code and message.
                });
              }
            }
          ]
        });

        await alert.present();

      })
  }

  checkIfIamIn() {
    var participants = this.selTrip.get("participants");
    let a = this;
    var isInArray1 = participants.find(function (el) { return el.id === a.myUser.id }) !== undefined;
    return isInArray1;
  }

  leaveThisTrip() {
    var participants = this.selTrip.get("participants");
    let a = this;
    participants.splice(participants.findIndex(v => v.id === a.myUser.id), 1);
    this.selTrip.save();
  }

  async joinThisTrip() {
    let a = this;
    const modal = await this.modalCtrl.create({
      component: JoinTripPage,
      componentProps: {
        thetrip: a.selTrip
      }
    });
    await modal.present();

  }

  checkIfIamDriver() {

    let driver = this.selTrip.get('driver');

    if (driver.id == this.myUser.id) {
      return false;
    }
    else {
      return true;
    }
  }


  ngOnInit() {
  }
}

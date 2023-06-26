import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, IonRouterOutlet, AlertController, Platform, NavController } from '@ionic/angular';
import { TripRequestPage } from '../trip-request/trip-request.page';
import { ClubDescriptionPage } from '../club-description/club-description.page';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import Parse from 'parse';
import { TranslateService } from '@ngx-translate/core';
import { ConnectionService } from '../services/connection/connection.service';
import { DisplayService } from '../services/display/display.service';

@Component({
  selector: 'app-club-details',
  templateUrl: './club-details.page.html',
  styleUrls: ['./club-details.page.scss'],
})
export class ClubDetailsPage {

  tripList = [];
  selAcademia: any;
  myClubsList = [];
  myUser: any;
  showAdd = true;
  aLocale = "es";
  displayService: any;
  nearby = false;

  academiaID: any;

  constructor(
    private conn: ConnectionService,
    private route: ActivatedRoute,
    private modalCtrl: ModalController,
    private routerOutlet: IonRouterOutlet,
    private router: Router,
    private alertController: AlertController,
    private geolocation: Geolocation,
    private platform: Platform,
    private translate: TranslateService,
    private displaySvc: DisplayService,
    private nav: NavController) {
    this.displayService = this.displaySvc
    this.route.params.subscribe(params => {
      this.academiaID = params['id'];
      this.getMyAcademia(this.academiaID);

    });
  }

  ionViewWillEnter() {
    this.getUser();
  }

  async callNo() {
    let number = this.selAcademia.get("phone");
    number = number.replace(/\s/g, '');
    window.location.href = "tel:" + number;
  }

  async openWhatsapp() {
    let number = this.selAcademia.get("phone");
    number = number.replace(/\s/g, '');
    window.location.href = "https://wa.me/" + this.selAcademia.get("phone") + "?text=";
  }

  async openMapsApp() {
    let location = "" + this.selAcademia.get("lat") + "," + this.selAcademia.get('lng');

    location = location.replace(" ", "");
    //window.location.href = 'geo:' + location;
    if (this.platform.is('android')) {
      window.location.href = 'geo:' + location + '?q=' + location;
    } else {
      window.location.href = 'maps://maps.apple.com/?q=' + location;
    }
  }

  async getUser() {
    this.myUser = await this.conn.getUserDetails();
    this.myClubsList = this.myUser.get("myClubs");
    this.aLocale = this.myUser.get('lngCode');
  }

  async showInfo() {
    let a = this;
    const modal = await this.modalCtrl.create({
      component: ClubDescriptionPage,
      cssClass: 'descriptionPage',
      presentingElement: this.routerOutlet.nativeEl,
      swipeToClose: true,
      componentProps: {
        'selAcademia': a.selAcademia
      }
    });
    await modal.present();
  }

  geoLocate() {
    if (this.nearby) {
      this.geolocation.getCurrentPosition().then((resp) => {
        var startPoint = new Parse.GeoPoint({ latitude: resp.coords.latitude, longitude: resp.coords.longitude });
        this.conn.getTripsForAcademia(this.selAcademia, startPoint).then(res => {
          this.tripList = res;
          for (let t of this.tripList) {
            if (t.get('driver')) {
              let academia = t.get('driver');
              academia.fetch();
            }
          }
        })

      }).catch((error) => {
        console.error('Error getting location', error);
      });

    }
    else {
      this.getTrips();
    }
  }


  checkIfFavorite() {
    if (!this.myClubsList) {
      this.myClubsList = [];
    }
    if (this.myClubsList.includes(this.myClubsList.find(el => el.id === this.selAcademia.id))) {
      this.showAdd = false;
    }
    else {
      this.showAdd = true;
    }
  }

  async showNoGo() {
    this.translate.get(['Error', 'Please fill the DNI in your profile', 'Edit']).subscribe(
      async res => {
        const alert = await this.alertController.create({
          cssClass: 'my-custom-class',
          header: res['Error'],
          message: res['Please fill the DNI in your profile'],
          buttons: [
            {
              text: 'OK',
              role: 'cancel',
              cssClass: 'secondary',
              handler: () => { }
            }
            , {
              text: res['Edit'],
              handler: () => {
                this.goToMyProfile();
              }
            }
          ]
        });
        await alert.present();
      })
  }

  goToMyProfile() {
    this.nav.navigateRoot('/tabs/profile');
  }

  /**
   * Get details for 1 school
   * @param id string the school id
   */
  getMyAcademia(id) {
    this.conn.getAcademiaWith(id).then(res => { this.selAcademia = res; this.getTrips(); });
  }

  /**
   * Load the trips from the server
   */
  getTrips() {
    this.conn.getTripsForAcademia(this.selAcademia, null).then(res => {
      this.tripList = res;
      // fetch the driver details for all trips
      for (let t of this.tripList) {
        if (t.get('driver')) { t.get('driver').fetch(); }
      }
    })
    this.checkIfFavorite();
  }

  /**
   * Called to open the trip details page
   * @param trip parse object the trip data
   */
  showTripDetails(trip) {
    if (trip.get('driver'))
      this.router.navigate(["/trip-details", trip])
  }

  /**
   * Utility to get the trip name from the trip data
   * @param trip parse object the trip
   * @returns string the trip name
   */
  getTripName(trip) {
    return trip.get('destinationAcademia').get('name');
  }

  /**
   * Utility to get the color for the trip based on the driver
   * @param t parse object the trip object
   * @returns 
   */
  getColor(trip) {
    let driver = trip.get('driver');
    if (!driver) {
      return "red";
    }
    else if (driver.id == this.myUser.id) {
      return 'green';
    }
    else {
      return '#418BCA';
    }
  }

  /**
   * Called to add a trip - checks if the user has the right setup
   */
  async addTrip() {
    if (this.myUser.get('dni') && this.myUser.get('dni').length > 0) {
      let a = this;
      const modal = await this.modalCtrl.create({
        component: TripRequestPage,
        componentProps: {
          selAcademia: a.selAcademia
        }
      });
      modal.onDidDismiss().then(data => {
        this.getTrips();
      });
      await modal.present();
    }
    else {
      this.showNoGo();
    }
  }

  /**
   * Utility to get a human friendlly address
   * @param a parse object - the address
   * @returns string with the address
   */
  getDestName(a) {
    if (a.get("yourAddress") != undefined) {
      let address = JSON.parse(a.get("yourAddress"));
      if (address) {
        return address.street + ',' + address.city;
      }
      else {
        return "Unknown";
      }
    }
    else {
      return "Unknown";
    }
  }

  /**
   * Called to actually remove a school from favorite list
   */
  removeFavorite() {
    this.myClubsList.splice(this.myClubsList.indexOf(this.selAcademia), 1);
    this.myUser.set("myClubs", this.myClubsList);
    this.myUser.save().then(res => {
      this.nav.back();
    });
    this.checkIfFavorite();
  }

  /**
   * Open a confirmation modal to confirm adding a school to favorites
   */
  saveFavorite() {
    if (!this.showAdd) {
      let a = this;
      this.translate.get(['Confirm', 'Are you sure you want to remove this club?', 'Add']).subscribe(
        async res => {
          const alert = await this.alertController.create({
            cssClass: 'my-custom-class',
            header: res['Confirm'],
            message: res['Are you sure you want to remove this club?'],
            buttons: [
              {
                text: 'Cancel',
                role: 'cancel',
                cssClass: 'secondary',
                handler: () => { }
              }, {
                text: 'OK',
                handler: () => {
                  a.removeFavorite();
                }
              }
            ]
          });

          await alert.present();
        })

    }
    else {

      if (!this.myClubsList) {
        this.myClubsList = [];
      }
      this.myClubsList.push(this.selAcademia);
      this.myUser.set("myClubs", this.myClubsList);
      this.myUser.save();

    }
    this.checkIfFavorite();
  }


}

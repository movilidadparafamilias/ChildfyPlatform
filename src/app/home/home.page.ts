import { Component, OnInit, ViewChild } from '@angular/core';
import { ConnectionService } from '../services/connection/connection.service';
import { ModalController, NavController, IonSlides, Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { OnboardingPage } from '../onboarding/onboarding.page';
import { Router } from '@angular/router';
import localeIt from '@angular/common/locales/it';
import localeES from '@angular/common/locales/es-AR';
import { registerLocaleData } from '@angular/common';
import { ClubCodePage } from '../club-code/club-code.page';
import { DisplayService } from '../services/display/display.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  loggedUser: any;
  momentjs: any = moment;
  myTrips = [];
  showEnrollment = false;
  todayTrips = [];
  upcommingTrips = [];
  myClubs = [];
  aLocale = "en"
  showPopUp = false;
  displayService: any;
  slideOpts = {
    initialSlide: 0,
    speed: 400,
    slidesPerView: 3,
    freeMode: true,


  };

  @ViewChild("homeSlider", { static: true }) aslides: IonSlides;

  constructor(
    private conn: ConnectionService,
    private modalCtrl: ModalController,
    private nav: NavController,
    public platform: Platform,
    private displaySvc: DisplayService,
    private router: Router) {

    this.displayService = this.displaySvc;
    document.addEventListener('ionBackButton', (ev) => {
      return;
    });
    this.platform.resume.subscribe(async () => {
      this.getUser();
      this.getMyTrips();
    });

    this.showEnrollment = true;


  }

  closepopup() {

    this.showPopUp = false;
    localStorage.setItem("popUpShown", "0");
  }

  ionViewWillEnter() {
    this.getUser();
    this.getMyTrips();
  }

  async getUser() {
    this.loggedUser = await this.conn.getUserDetails();
    this.aLocale = this.loggedUser.get('lngCode');

    if (this.loggedUser.get('approved') == 0) {

      //this.conn.logout();
      this.nav.navigateRoot('/code-input', { skipLocationChange: true });
    }
    else {
      this.getClubs();

      var myAdrresses = this.loggedUser.get("myAddresses");
      var myChildrens = this.loggedUser.get("myChildrens");
      if (!myAdrresses || !myChildrens) { if (this.showEnrollment) this.showEnrolling(); }
      this.showPopUp = false;
    }
  }

  async getClubs() {

    var clubs = this.loggedUser.get("myClubs")
    this.myClubs = clubs;
    if (!this.myClubs) {
      this.myClubs = [];
    }
    for (let t of this.myClubs) {
      t.fetch();
    }
  }


  async showEnrolling() {
    this.showEnrollment = false;
    const modal = await this.modalCtrl.create({
      component: OnboardingPage
    });
    await modal.present();

    modal.onDidDismiss().then(data => {
      this.getUser();
    });
  }

  ngAfterViewInit() {

    if ((<any>window).twttr)
      (<any>window).twttr.widgets.load();
  }

  ngOnInit() {
    registerLocaleData(localeES, 'es');

  }

  async addClub() {
    let a = this;
    const modal = await this.modalCtrl.create({
      component: ClubCodePage,
      componentProps: {
      }
    });

    modal.onDidDismiss().then(data => {
      this.getClubs();
    });

    await modal.present();

  }

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

  async getMyTrips() {
    this.conn.getMyTrips(0).then(res => {
      this.myTrips = res;
      for (let t of this.myTrips) {
        let academia = t.get('destinationAcademia');
        academia.fetch();
        let driver = t.get('driver');
        if (driver) {
          driver.fetch();
        }
      }
      this.sortTrips();
    })
  }


  sortTrips() {
    this.todayTrips = [];
    this.upcommingTrips = [];
    for (let t of this.myTrips) {
      if (moment(t.get('date')).isSame(new Date(), "day")) {
        this.todayTrips.push(t);
      }
      if (moment(t.get('date')).isAfter(new Date(), "day")) {
        this.upcommingTrips.push(t);
      }
    }
  }



  getTripName(t) {
    let academia = t.get('destinationAcademia');
    var name = academia.get('name');
    return name;
  }

  showTripDetails(t) {
    if (t.get('driver'))
      this.router.navigate(["/trip-details", t])
  }


  checkIfIamDriver(trip) {
    let driver = trip.get('driver');
    if (!driver) {
      return "red";
    }
    else if (driver.id == this.loggedUser.id) {
      return 'green';
    }
    else {
      return '#418BCA';
    }
  }
}

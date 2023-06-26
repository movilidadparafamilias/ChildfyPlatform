import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlide, IonSlides, ModalController } from '@ionic/angular';
import { ConnectionService } from '../services/connection/connection.service';
import { Map, tileLayer, marker, geoJSON, latLngBounds, icon, Marker } from 'leaflet';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.page.html',
  styleUrls: ['./onboarding.page.scss'],
})
export class OnboardingPage implements OnInit {
  slideOpts2 = {
    initialSlide: 0,
    speed: 400,
    calculateHeight: true,
    autoHeight: true,
    slidesPerView: 1,
    freeMode: false,
    allowTouchMove: false
  };
  searchTerm = "";
  searchTerm2 = "";
  myUser: any;
  childName = "";
  childAge = "";
  childseat = false;

  curentPage = 0;

  map: Map;
  sugestions: [];
  cAddress: any = {};
  geoLayer: any;
  newMarker: any;
  asearchTerm: any;

  addressName = "";
  addressStreet = "";
  addressNumber = "";
  addressCity = "";
  addressRegion = "";
  addressNotes = "";
  postalCode = "";
  state = "";
  mydni = "";
  lat: any;
  lng: any;


  showAddress = false;
  showKid = true;

  clubList: any = [];
  @ViewChild("onboarding", { static: true }) aslides: IonSlides;

  constructor(private conn: ConnectionService, private modalCtrl: ModalController) {


  }

  ionViewWillEnter() {
    this.getUser();
  }

  clearSearch() {

  }

  async getUser() {
    this.myUser = await this.conn.getUserDetails();
    var myClubs = this.myUser.get("myClubs")
    var myAdrresses = this.myUser.get("myAddresses");
    var myChildrens = this.myUser.get("myChildrens");

    if (myChildrens && myChildrens.length > 0) {
      this.aslides.lockSwipes(false);
      this.showAddress = true;
      this.loadMap();
      this.next();
      this.showKid = false;
      this.aslides.lockSwipes(true);

    }


    if (myAdrresses && myAdrresses.length > 0) {
      this.aslides.lockSwipes(false);
      this.showKid = false;
      this.showAddress = false;
      this.next();
      this.aslides.lockSwipes(true);
    }

    if (myClubs && myClubs.length > 0) {
      this.aslides.lockSwipes(false);
      this.aslides.slideNext();
      this.aslides.lockSwipes(true);
    }

  }

  ngOnInit() {
    //this.slides.lockSwipes(true);
    this.aslides.update();
  }

  getClubs() {
    this.conn.getClubs(this.curentPage).then(res => {
      this.clubList = this.clubList.concat(res);
    })
  }


  saveChildren() {
    var myChildrens = this.myUser.get("myChildrens");
    if (!myChildrens) {
      myChildrens = [];
    }
    myChildrens.push({ name: this.childName, date: this.childAge, seat: this.childseat });
    this.myUser.set("myChildrens", myChildrens);
    this.myUser.save().then(() => {
      this.showAddress = true;

      this.next();
      this.showKid = false;
      this.loadMap();

    });
  }

  saveAddress() {=
    var myAdrresses = this.myUser.get("myAddresses");
    if (!myAdrresses) {
      myAdrresses = [];
    }
    if (!this.lat || !this.lng) {

      this.searchTerm = "" + this.addressStreet + " " + this.addressNumber + " " + this.addressCity + " " + this.postalCode;
      this.asugest();
      return
    }
    myAdrresses.push({ name: "Domicilio habitual", street: this.addressStreet, number: this.addressNumber, streat: this.addressStreet, city: this.addressCity, region: this.addressRegion, notes: this.addressNotes, lng: this.lng, lat: this.lat });
    this.myUser.set("dni", this.mydni);
    this.myUser.set("myAddresses", myAdrresses);
    this.myUser.save().then(() => {
      this.showKid = false;
      this.showAddress = false;



      this.skip();
    });
  }

  addToFavorite(item) {
    var myClubsList = this.myUser.get("myClubs");
    if (!myClubsList) {
      myClubsList = [];
    }
    myClubsList.push(item);
    this.myUser.set("myClubs", myClubsList);
    this.myUser.save().then(() => { this.skip(); });
  }

  skip() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }


  loadMap() {
    this.map = new Map("mapId").setView([36.7213028, -4.4216366], 13);
    tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      { attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>' }).addTo(this.map);
    this.geoLayer = geoJSON(null, { style: { fillColor: '#27b5e8', color: '#333333', weight: 1, opacity: 0.8 } });
    this.geoLayer.addTo(this.map);
  }

  next() {

    this.aslides.lockSwipes(false)
    this.aslides.slideNext();
    this.aslides.lockSwipes(true);
  }


  useAddress(c) {
    this.addMarkerAtPos(c.lat, c.lon);
    this.addressStreet = c.address.road;

    if (c.address.city) {
      this.addressCity = c.address.city;
    }
    else if (c.address.town) {
      this.addressCity = c.address.town;
    }
    this.postalCode = c.address.postcode;
    this.state = c.address.state;
    this.sugestions = [];

  }

  asugest() {
    if (this.searchTerm.length > 0) {
      this.conn.searchLocation(this.searchTerm).then(res => {
        this.sugestions = res as any;
      })

    }
    else {
      this.sugestions = [];
    }
  }


  addMarkerAtPos(lat, lng) {
    if (this.newMarker) {
      this.newMarker.removeFrom(this.map);
    }


    this.newMarker = marker([lat, lng], {
      draggable: true
    }).addTo(this.map);
    this.lat = parseFloat(lat);
    this.lng = parseFloat(lng);
    let a = this;
    this.newMarker.on('dragend', function (e) {

      let position = a.newMarker.getLatLng();
      a.cAddress.lat = position.lat;
      a.cAddress.lng = position.lng;
    });
    this.centerMapOnMarker();
  }
  centerMapOnMarker() {
    var latLngs = [this.newMarker.getLatLng()];
    var markerBounds = latLngBounds(latLngs);
    this.map.fitBounds(markerBounds, { maxZoom: 17 });
  }

  loadData(event) {
    this.curentPage++;
    this.getClubs();
    event.target.complete();
  }

  sugest() {
    if (this.searchTerm2.length == 0) {
      this.clubList = [];
      this.curentPage = 0;
    }
    else {
      this.conn.searchAcademia(this.searchTerm2).then(res => {
        this.clubList = res;
      })
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { Map, tileLayer, marker, geoJSON, latLngBounds, icon, Marker } from 'leaflet';
import { ConnectionService } from '../services/connection/connection.service';
import { NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-new-address',
  templateUrl: './new-address.page.html',
  styleUrls: ['./new-address.page.scss'],

})
export class NewAddressPage implements OnInit {
  map: Map;
  sugestions: [];
  cAddress: any = {};
  geoLayer: any;
  newMarker: any;
  searchTerm: any;
  editing = false;

  myUser: any;
  index;
  adressList = [];

  constructor(private conn: ConnectionService, private nav: NavController, private route: ActivatedRoute, private alertController: AlertController, private translate: TranslateService) {
    this.route.params.subscribe(params => {
      this.index = parseInt(params.id);
    });
  }

  ngOnInit() {
  }
  ionViewDidEnter() {
    this.getUser();
    this.loadMap();
  }

  loadMap() {
    this.map = new Map("mapId").setView([36.7213028, -4.4216366], 13);
    tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      { attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>' }).addTo(this.map); 
    this.geoLayer = geoJSON(null, { style: { fillColor: '#27b5e8', color: '#333333', weight: 1, opacity: 0.8 } });
    this.geoLayer.addTo(this.map);
  }

  clearSearch() {

    this.sugestions = [];
  }

  useAddress(c) {
    this.addMarkerAtPos(c.lat, c.lon);
    this.cAddress.street = c.address.road;

    if (c.address.city) {
      this.cAddress.city = c.address.city;
    }
    else if (c.address.town) {
      this.cAddress.city = c.address.town;
    }
    this.cAddress.postalCode = c.address.postcode;
    this.cAddress.state = c.address.state;
    this.sugestions = [];

  }

  sugest() {
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
    this.cAddress.lat = parseFloat(lat);
    this.cAddress.lng = parseFloat(lng);
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

  async deleteAddress() {
    let a = this;
    this.translate.get(['Confirm', 'Are you sure you want to delete this address?', 'Add']).subscribe(
      async res => {
        const alert = await this.alertController.create({
          cssClass: 'my-custom-class',
          header: res['Confirm'],
          message: res['Are you sure you want to delete this address?'],
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

                a.adressList.splice(this.index, 1);
                a.myUser.save().then(res => {
                  a.nav.back();
                });
              }
            }
          ]
        });

        await alert.present();
      })
  }

  addAddress() {

    if (!this.cAddress.lat || !this.cAddress.lng) {

      this.searchTerm = "" + this.cAddress.street + " " + this.cAddress.no + " " + this.cAddress.city + " " + this.cAddress.postalCode;
      this.sugest();
      return
    }

    if (this.index > -1) {



      this.adressList[this.index] = this.cAddress;
      this.myUser.save().then(res => {


        this.nav.back();
      });
    }
    else {
      this.adressList.push(this.cAddress);
      this.myUser.save().then(res => {
        this.nav.back();
      });

    }

  }


  async getUser() {

    this.myUser = await this.conn.getUserDetails();
    this.adressList = this.myUser.get("myAddresses");
    if (!this.adressList) {
      this.adressList = [];
      this.myUser.set("myAddresses", this.adressList);
    }
    if (this.index > -1) {
      this.cAddress = this.adressList[this.index];
      this.addMarkerAtPos(this.cAddress.lat, this.cAddress.lng);
      this.editing = true;
    }
    else {
      this.cAddress = {};
    }
  }

}

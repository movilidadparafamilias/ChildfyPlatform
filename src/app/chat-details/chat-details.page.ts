import { Component, OnInit, ViewChild, NgZone, ViewRef } from '@angular/core';
import { IonContent, ModalController, AlertController, NavController } from '@ionic/angular';
import { ConnectionService } from '../services/connection/connection.service';
import { ActivatedRoute } from '@angular/router';
import { DocDataInputPage } from '../doc-data-input/doc-data-input.page';
import { ReviewDocPage } from '../review-doc/review-doc.page';
import * as moment from 'moment';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-chat-details',
  templateUrl: './chat-details.page.html',
  styleUrls: ['./chat-details.page.scss'],
})
export class ChatDetailsPage implements OnInit {

  messagesList = [];
  myUser: any;
  convers: any;
  newMessage = "";
  subscription: any;
  trip: any;
  routeData: any;
  academia: any;
  showButtons = true;
  lng = ""
  @ViewChild(IonContent, { read: IonContent, static: false }) myContent: IonContent;

  constructor(private conn: ConnectionService, private route: ActivatedRoute, private zone: NgZone, public modalController: ModalController, private alertController: AlertController, private navCtrl: NavController, private translate: TranslateService) {


  }

  ngOnInit() {
  }

  ScrollToBottom() {
    setTimeout(() => {
      this.myContent.scrollToBottom(300);

    }, 500);
  }

  ionViewDidEnter() {
    this.route.params.subscribe(params => {
      this.getConversation(params['id']);
    });

  }

  getDestination() {
    return this.academia.get('name');

  }

  getSide(m) {
    var sender = m.get('sender');
    if (sender.id != this.myUser.id) {
      return 4;
    }
    else {
      return 0;
    }

  }

  IamDriver() {
    var driver = this.trip.get('driver');

    if (this.myUser.id == driver.id) {
      return true;
    }

    return false;


  }

  async getConversation(id) {
    this.lng = await this.conn.getLng();
    this.myUser = await this.conn.getUserDetails();
    this.conn.getConverstioByID(id).then(async res => {
      this.convers = res;
      this.trip = this.convers.get("trip");
      try {
        await this.trip.fetch();
      }
      catch (e) {
      }

      this.academia = this.trip.get('destinationAcademia');
      try {
        await this.academia.fetch();
      }
      catch (e) {

        console.error(e)
      }
      this.messagesList = await this.conn.getMessagesForConversation(this.convers);
      for (let mess of this.messagesList) {
        if (mess.get("viewer").every(viewer => viewer.id != this.myUser.id)) {
          let v = mess.get('viewer');
          v.push(this.myUser);
          mess.set("viewer", v);
          mess.save();
        }

      }
      this.subscription = await this.conn.subscribeToConversation(this.convers);
      this.ScrollToBottom();
      this.subscription.on('open', () => {
        console.log('subscription opened');
      });
      this.subscription.on('create', async (object) => {
        this.zone.run(() => {
          this.messagesList.push(object);
          this.ScrollToBottom();
          this.convers.fetch();
        });

      });
    })

  }

  ngOnDestroy() {
    if (this.subscription)
      this.subscription.unsubscribe();
  }

  ionViewWillUnload() {
    this.subscription.unsubscribe();
  }


  async showNoGo() {
    this.translate.get(['Error', 'No more seats available! Try to join another trip', 'Add']).subscribe(
      async res => {
        const alert = await this.alertController.create({
          cssClass: 'my-custom-class',
          header: res['Error'],
          message: res['No more seats available! Try to join another trip'],
          buttons: [
            {
              text: 'OK',
              role: 'cancel',
              cssClass: 'secondary',
              handler: (blah) => {

              }
            }

          ]
        });

        await alert.present();

      })
  }

  async addParticipant(m) {
    let seats = parseInt(this.trip.get('freeSeats'));
    if (seats > 0) {
      seats--;
    }
    else {
      this.showNoGo();
      return;
    }

    var members = this.trip.get("participants");
    var stops = this.trip.get("stops");
    var newM = m;
    let persData = this.convers.get("persData");
    persData.lat = persData.myAddresses.lat;
    persData.lng = persData.myAddresses.lng;
    stops.push({ user: newM, address: persData });
    members.push(newM);
    this.trip.set("stops", stops);
    this.trip.set("participants", members);
    this.convers.set("status", 3);
    this.trip.set('freeSeats', "" + seats);
    this.trip.save().then(res => { });
    this.convers.save().then(res => { this.convers.fetch(); this.conn.sendEmptyMesage(this.convers) });
  }

  async aproveUser(m) {

    var members = this.trip.get("participants");
    var newM = m.get('sender');
    this.convers.set("status", 2);
    this.convers.save();

    this.conn.sendAproveCard(this.convers);

  }

  async rejectUser() {

    this.conn.sendRejectCard(this.convers);

  }

  async signDoc(m) {
    let a = this;
    const modal = await this.modalController.create({
      component: ReviewDocPage,
      cssClass: 'my-custom-class',
      componentProps: {
        'convers': this.convers,
        'isDriver': this.IamDriver()
      }
    });

    modal.onWillDismiss().then(data => {
      if (data.data.signed) {
        if (data.data.isDrive) {
          a.saveDriverDocData(data.data.image, data.data.docData);
        }
        else {
          a.saveDocData(data.data.image, data.data.docData);
        }




      }
    })
    return await modal.present();
  }

  async saveDriverDocData(image, info) {

    this.convers.set('driverSignature', image);
    this.convers.set('docData', info);
    this.convers.save().then(res => {
      if (this.convers.get('driverSignature') && this.convers.get('signature')) {

        this.addParticipant(this.getTheOtherUser(this.convers));

      }

    });


  }

  async saveDocData(image, info) {

    this.convers.set('signature', image);
    this.convers.set('docData', info);
    this.convers.save().then(res => {
      this.conn.sendEmptyMesage(this.convers);
      if (this.convers.get('driverSignature') && this.convers.get('signature')) {
        this.addParticipant(this.myUser);

      }
    });


  }

  async reviewDoc() {
    let a = this;
    const modal = await this.modalController.create({
      component: ReviewDocPage,
      cssClass: 'my-custom-class',
      componentProps: {}
    });


    return await modal.present();
  }

  calculateDeparture(lat, lng) {
    this.routeData = JSON.parse(this.trip.get('trip'));
    if (this.routeData.solution.routes.length > 0) {
      let r = this.routeData.solution.routes[0].activities;
      let t = moment(this.trip.get('arrivalTime')).subtract(this.routeData.solution.completion_time, 's');
      for (let rr of r) {
        if (rr.address.location_id === "" + lat + "" + lng) {
          return t.add(rr.arr_time, "s").format('HH:mm').toString();
        }
      }
    }
    return "00:00";

  }

  getFinalMessage() {

    let day = moment(this.trip.get('arrivalTime')).format('DD/MM/YYYY');
    let time = moment(this.trip.get('arrivalTime')).format('HH:mm');

    let aAddress = this.convers.get('persData');
    let pTime = this.calculateDeparture(aAddress.lat, aAddress.lng);
    let from = '' + aAddress.myAddresses.street + ', ' + aAddress.myAddresses.no + ', ' + aAddress.myAddresses.city;

    let mesaj = "Your trip will take place on " + day + "  at " + pTime + " departing from " + from;
    if (this.lng == "es")
      mesaj = "Su trayecto tendrá lugar el día " + day + " a las " + pTime + " con salida desde " + from;

    return mesaj;
  }


  getTheOtherUser(c) {
    var members = c.get('members');
    for (let m of members) {
      if (m.id != this.myUser.id) {
        return m;
      }
    }
  }

  getTheOther(c) {
    var members = c.get('members');
    for (let m of members) {
      if (m.id != this.myUser.id) {
        return m.get('name');
      }
    }
  }

  async sendMessage(text) {
    this.conn.sendMesage(this.convers, text);
    this.newMessage = "";
  }


}

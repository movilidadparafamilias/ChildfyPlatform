import { Component, OnInit } from '@angular/core';
import { ConnectionService } from '../services/connection/connection.service';
import { ModalController, NavParams, AlertController, NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-join-trip',
  templateUrl: './join-trip.page.html',
  styleUrls: ['./join-trip.page.scss'],
})
export class JoinTripPage implements OnInit {

  myUser: any;
  myAdrresses = [];
  requestData: any = {};
  myChildrens = [];
  selTrip;

  constructor(private conn: ConnectionService, private modalCtrl: ModalController, public navParams: NavParams, private alertController: AlertController, private translate: TranslateService, private nav: NavController) {
    this.getUser();
    this.selTrip = this.navParams.get('thetrip');
  }

  ngOnInit() {
  }

  async getUser() {
    this.myUser = await this.conn.getUserDetails();
    this.myAdrresses = this.myUser.get("myAddresses");
    this.myChildrens = this.myUser.get("myChildrens");
  }


  closePage() {

    this.modalCtrl.dismiss();
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


  saveRequest() {
    let seats = parseInt(this.selTrip.get('freeSeats'));
    if (seats <= 0) {
      this.showNoGo();

      return;
    }

    if (this.requestData.addInd > -1) {

      if (this.requestData.cInd > -1) {
        this.requestData.myAddresses = this.myAdrresses[this.requestData.addInd];
        this.requestData.myChildren = this.myChildrens[this.requestData.cInd].name;
        this.conn.joinTrip(this.selTrip, this.requestData).then(res => {

          this.translate.get(['Success', 'Your request has been sent', 'Add']).subscribe(
            async res => {
              const alert = await this.alertController.create({
                cssClass: '',
                header: res['Success'],
                message: res['Your request has been sent'],
                buttons: [
                  {
                    text: 'OK',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: (blah) => {
                      this.modalCtrl.dismiss();
                    }
                  }
                ]
              });

              await alert.present();
            });


        })
      }
      else {

        //children popup
        this.translate.get(['Error', 'Please select a children or add a new one', 'Add']).subscribe(
          async res => {
            const alert = await this.alertController.create({
              cssClass: '',
              header: res['Error'],
              message: res['Please select a children or add a new one'],
              buttons: [
                {
                  text: 'OK',
                  role: 'cancel',
                  cssClass: 'secondary',
                  handler: (blah) => {
                  }
                }, {
                  text: res['Add'],
                  handler: () => {
                    this.goToMyKids();
                  }
                }
              ]
            });

            await alert.present();
          });

      }
    }
    else {
      this.translate.get(['Error', 'Please select an address or add a new one', 'Add']).subscribe(
        async res => {
          const alert = await this.alertController.create({
            cssClass: '',
            header: res['Error'],
            message: res['Please select an address or add a new one'],
            buttons: [
              {
                text: 'OK',
                role: 'cancel',
                cssClass: 'secondary',
                handler: (blah) => {
                }
              }, {
                text: res['Add'],
                handler: () => {
                  this.goToMyAddresses();
                }
              }
            ]
          });

          await alert.present();
        });

    }
  }

  goToMyAddresses() {
    this.modalCtrl.dismiss();
    this.nav.navigateRoot('/myaddresses');

  }

  goToMyKids() {
    this.modalCtrl.dismiss();
    this.nav.navigateRoot('/mychildren');

  }

}

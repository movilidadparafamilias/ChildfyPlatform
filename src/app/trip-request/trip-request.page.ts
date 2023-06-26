import { Component, OnInit } from '@angular/core';
import { ConnectionService } from '../services/connection/connection.service';
import { ModalController, NavParams, AlertController, NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-trip-request',
  templateUrl: './trip-request.page.html',
  styleUrls: ['./trip-request.page.scss'],
})
export class TripRequestPage implements OnInit {
  requestType = 1;
  myUser: any;
  myAdrresses = [];
  tripData: any = {};
  myChildrens = [];
  minDate: String = new Date().toISOString();
  selAcademia;
  constructor(private conn: ConnectionService, private modalCtrl: ModalController, public navParams: NavParams, private alertController: AlertController, private translate: TranslateService, private nav: NavController) {

    this.getUser();
    this.selAcademia = this.navParams.get('selAcademia');
    this.tripData.academia = this.selAcademia;
  }

  ngOnInit() {
  }

  async getUser() {
    this.myUser = await this.conn.getUserDetails();
    this.myAdrresses = this.myUser.get("myAddresses");
    this.myChildrens = this.myUser.get("myChildrens");
  }

  ionViewWillEnter() {

  }

  async saveTrip() {
    if (!this.myUser.get('car')) {
      //children popup
      this.translate.get(['Error', 'Please add a car to your profile', 'Add']).subscribe(
        async res => {

          const alert = await this.alertController.create({
            cssClass: '',
            header: res['Error'],
            message: res['Please add a car to your profile'],
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
                  this.goToMyCar();
                }
              }
            ]
          });

          await alert.present();
        });

      return;
    }

    if (this.tripData.addInd > -1) {

      if (this.tripData.myChildren != undefined) {

        if (this.tripData.freeSeats != undefined) {

          if (this.tripData.arrivalTime != undefined && this.tripData.date != undefined) {


            this.tripData.myAddresses = this.myAdrresses[this.tripData.addInd];

            this.conn.createTrip(this.tripData).then(async () => {
              //goback

              this.translate.get(['Success', 'The trip was added', 'Add']).subscribe(
                async res => {
                  const alert = await this.alertController.create({
                    cssClass: '',
                    header: res['Success'],
                    message: res['The trip was added'],
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
            });


          }
          else {

            //date popup
            this.translate.get(['Error', 'Please add a date and an hour for your trip', 'Add']).subscribe(
              async res => {
                const alert = await this.alertController.create({
                  cssClass: '',
                  header: res['Error'],
                  message: res['Please add a date and an hour for your trip'],
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
              });
          }
        }
        else {
          //seats popup
          this.translate.get(['Error', 'Please select how many free seats you have', 'Add']).subscribe(
            async res => {
              const alert = await this.alertController.create({
                cssClass: '',
                header: res['Error'],
                message: res['Please select how many free seats you have'],
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
            });
        }
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
      //addrress popup
    }
  }

  goToMyAddresses() {
    this.modalCtrl.dismiss();
    this.nav.navigateRoot('/myaddresses');

  }

  goToMyCar() {
    this.modalCtrl.dismiss();
    this.nav.navigateRoot('/my-car');
  }

  goToMyKids() {
    this.modalCtrl.dismiss();
    this.nav.navigateRoot('/mychildren');

  }

  saveRequest() {
    this.tripData.myAddresses = this.myAdrresses[this.tripData.addInd];

    this.conn.requestTrip(this.tripData).then(() => {

      this.translate.get(['Success', 'Request has been sent!', 'Add']).subscribe(
        async res => {
          const alert = await this.alertController.create({
            cssClass: '',
            header: res['Success'],
            message: res['Request has been sent!'],
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
    });
  }

  closePage() {

    this.modalCtrl.dismiss();
  }


  segmentChanged(e) {


  }
}

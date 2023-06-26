import { Component, OnInit, Input } from '@angular/core';
import { ConnectionService } from '../services/connection/connection.service';
import { NavController, ModalController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { DocDataInputPage } from '../doc-data-input/doc-data-input.page';
import { SignDocPage } from '../sign-doc/sign-doc.page';
import { DriverDocDataInputPage } from '../driver-doc-data-input/driver-doc-data-input.page';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-review-doc',
  templateUrl: './review-doc.page.html',
  styleUrls: ['./review-doc.page.scss'],
})
export class ReviewDocPage implements OnInit {

  user: any;
  driver: any;
  child: any;
  trip: any;
  signatureImage = "";
  DriverSignatureImage = "";
  ready: boolean = false;
  docData: any = {};
  @Input() convers: any;
  @Input() isDriver: boolean;

  constructor(private conn: ConnectionService, private nav: NavController, private route: ActivatedRoute, private modalController: ModalController,
    private alertController: AlertController, private translate: TranslateService) {}

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.trip = this.convers.get("trip");
    this.getDriver();
  }


  getSigningUser() {

    let members = this.convers.get('members');
    for (let m of members) {

      if (m.id != this.driver.id) {
        this.user = m;
        m.fetch().then(() => {
          this.getChildData();
        })
      }
    }

  }

  getDriver() {

    let trip = this.convers.get('trip');
    this.driver = trip.get('driver');
    this.driver.fetch().then(() => {
      this.getSigningUser();
    })


  }

  getChildData() {

    let persData = this.convers.get('persData');
    let childrens = this.user.get('myChildrens');
    this.child = childrens[persData.cInd];

    this.compileData();

  }

  compileData() {

    if (this.convers.get('status') == 3) {
      this.docData = this.convers.get('docData');
      this.signatureImage = this.convers.get('signature');
      this.DriverSignatureImage = this.convers.get('driverSignature');
    }

    else if (this.convers.get('signature')) {
      this.docData = this.convers.get('docData');
      this.signatureImage = this.convers.get('signature');
    }

    else if (this.convers.get('driverSignature')) {
      this.docData = this.convers.get('docData');
      this.DriverSignatureImage = this.convers.get('driverSignature');
    }


    else {


      let parentName;

      if (this.user.get("surname")) {

        parentName = this.user.get("name") + " " + this.user.get("surname");

      }
      else {
        parentName = this.user.get("name");
      }


      let driverName;

      if (this.driver.get("surname")) {

        driverName = this.driver.get('name') + " " + this.driver.get("surname")
      }
      else {

        driverName = this.driver.get('name');
      }

      this.docData = {
        u1: parentName,
        u1_DNI: this.user.get("dni"),
        u1_address: this.convers.get('persData').myAddresses,
        c: this.child.name,
        cBdate: this.child.date,
        cDni: "",
        d_city: this.trip.get('yourAddress').city,
        d: driverName,
        d_DNI: this.driver.get('dni'),

        today: new Date()
      }
    }
    this.ready = true;

  }

  async editData() {

    if (this.isDriver) {
      const modal = await this.modalController.create({
        component: DriverDocDataInputPage,
        cssClass: 'my-custom-class',
        componentProps: {
          'docData': this.docData
        }
      });


      modal.onWillDismiss().then(data => {
      })
      return await modal.present();
    }

    else {



      const modal = await this.modalController.create({
        component: DocDataInputPage,
        cssClass: 'my-custom-class',
        componentProps: {
          'docData': this.docData
        }
      });


      modal.onWillDismiss().then(data => {
      })
      return await modal.present();
    }

  }

  async sign() {

    const modal = await this.modalController.create({
      component: SignDocPage,
      cssClass: 'my-custom-class',
      componentProps: {

      }
    });

    modal.onWillDismiss().then(data => {


      let sData = data as any;
      if (this.isDriver)
        this.DriverSignatureImage = sData.data.signature;
      else
        this.signatureImage = sData.data.signature;

    });

    return await modal.present();

  }

  cancel() {

    this.modalController.dismiss({ signed: false });
  }




  async save() {
    if (!this.isDriver && this.signatureImage.length > 0 &&
      this.docData.u1.length > 0 &&
      this.docData.u1_DNI.length > 0 &&
      this.docData.u1_address.city.length > 0 &&
      this.docData.c.length > 0 &&
      this.docData.cBdate.length > 0
      || this.isDriver &&
      this.docData.d_city.length > 0 &&
      this.docData.d.length > 0 &&
      this.docData.d_DNI.length > 0 &&
      this.DriverSignatureImage.length > 0
    ) {



      let signData = "";
      if (this.isDriver)
        signData = this.DriverSignatureImage;
      else
        signData = this.signatureImage;


      this.modalController.dismiss({ signed: true, image: signData, docData: this.docData, isDrive: this.isDriver });

    }
    else {
      this.translate.get(['Error', 'Please fill all data and sign the authorisation', 'Missing data']).subscribe(
        async res => {
          const alert = await this.alertController.create({
            cssClass: 'my-custom-class',
            header: res['Error'],
            subHeader: res['Missing data'],
            message: res['Please fill all data and sign the authorisation'],
            buttons: ['OK']
          });

          await alert.present();
        })
    }
  }
}

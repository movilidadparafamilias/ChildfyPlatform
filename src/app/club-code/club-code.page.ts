import { Component } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { ConnectionService } from '../services/connection/connection.service';

@Component({
  selector: 'app-club-code',
  templateUrl: './club-code.page.html',
  styleUrls: ['./club-code.page.scss'],
})
export class ClubCodePage {


  cCode: string = "";
  showError: boolean = false;

  constructor(
    private modalCtrl: ModalController,
    private connMan: ConnectionService,
    private alertController: AlertController,
    private translate: TranslateService) { }

  closePage() {

    this.modalCtrl.dismiss();
  }

  saveRequest() {
    if (this.cCode.length == 6) {
      this.connMan.addNewClubWithCode(this.cCode).then(async (res) => {
        if (res == 1) {
          this.translate.get(['Success', 'The club was added', 'Add']).subscribe(
            async res => {
              const alert = await this.alertController.create({
                cssClass: '',
                header: res['Success'],
                message: res['The club was added'],
                buttons: [
                  {
                    text: 'OK',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: () => {
                      this.modalCtrl.dismiss();
                    }
                  }
                ]
              });

              await alert.present();

            })
        }
        else {
          this.showError = true;
        }

      })
    }

    else {
      this.showError = true;

    }

  }


}

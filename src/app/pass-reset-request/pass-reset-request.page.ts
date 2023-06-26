import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { ConnectionService } from '../services/connection/connection.service';

@Component({
  selector: 'app-pass-reset-request',
  templateUrl: './pass-reset-request.page.html',
  styleUrls: ['./pass-reset-request.page.scss'],
})
export class PassResetRequestPage implements OnInit {

  email = "";

  constructor(private router: Router, private conn: ConnectionService, private translate: TranslateService, private alertController: AlertController) { }

  ngOnInit() {
  }



  sendResetRequest() {
    if (this.email.length > 0) {
      localStorage.setItem("resetEmail", this.email);
      this.conn.startResetPassword(this.email).then(res => {
        if (res == true) {
          this.router.navigateByUrl('/pass-reset-save');
        }
        else {
          this.translate.get(['Error', 'There is no account with this address', 'Add']).subscribe(
            async res => {
              const alert = await this.alertController.create({
                cssClass: '',
                header: res['Error'],
                message: res['There is no account with this address'],
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

      });


    }
    else {

    }
  }



}

import { Component } from '@angular/core';
import { ConnectionService } from '../services/connection/connection.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {

  myName = "";
  myEmail = "";
  myUser;
  constructor(private conn: ConnectionService, private router: Router, private alertController: AlertController, private translate: TranslateService,) {

    this.getUser();
  }



  async getUser() {
    this.myUser = await this.conn.getUserDetails();
    this.myName = this.myUser.get('name');
    this.myEmail = this.myUser.get('email');

  }

  deleteAccount() {
    let a = this;
    this.translate.get(['Confirm', 'Are you sure you want to remove this club?', 'Add']).subscribe(
      async res => {
        const alert = await this.alertController.create({
          cssClass: 'my-custom-class',
          header: res['Confirm'],
          message: res['Are you sure you want to delete your account? This can not be reversed'],
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
              cssClass: 'secondary',
              handler: () => { }
            }, {
              text: 'OK',
              handler: () => {
                a.conn.deleteUserAccount()
              }
            }
          ]
        });

        await alert.present();
      })

  }



  logout() {
    this.conn.logout().then(() => {
      this.router.navigateByUrl('/welcome');
    });
  }

}

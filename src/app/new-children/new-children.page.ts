import { Component, OnInit } from '@angular/core';
import { ConnectionService } from '../services/connection/connection.service';
import { NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-new-children',
  templateUrl: './new-children.page.html',
  styleUrls: ['./new-children.page.scss'],
})
export class NewChildrenPage implements OnInit {

  cChild: any = {};
  index;
  childList = [];
  myUser: any;
  editing = false;

  constructor(private conn: ConnectionService, private nav: NavController, private route: ActivatedRoute, private alertController: AlertController, private translate: TranslateService) {

    this.route.params.subscribe(params => {
      this.index = parseInt(params.id);
      if (this.index > -1) {
        this.editing = true
      }
    });
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.getUser();

  }

  async getUser() {

    this.myUser = await this.conn.getUserDetails();
    this.childList = this.myUser.get("myChildrens");
    if (!this.childList) {
      this.childList = [];


      this.myUser.set("myChildrens", this.childList);

    }
    if (this.index > -1) {
      this.cChild = this.childList[this.index];
      this.editing = true;
    }
    else {
      this.editing = false;
      this.cChild = {};
    }
  }

  async deleteKid() {
    let a = this;
    this.translate.get(['Confirm', 'Are you sure you want to delete this children?', 'Add']).subscribe(
      async res => {
        const alert = await this.alertController.create({
          cssClass: 'my-custom-class',
          header: res["Confirm"],
          message: res["Are you sure you want to delete this children?"],
          buttons: [
            {
              text: "Cancel",
              role: 'cancel',
              cssClass: 'secondary',
              handler: (blah) => {

              }
            }, {
              text: 'OK',
              handler: () => {

                a.childList.splice(this.index, 1);
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

  addChildren() {
    if (this.index > -1) {

      this.childList[this.index] = this.cChild;
      this.myUser.save().then(res => {
        this.nav.back();
      });
    }
    else {
      this.childList.push(this.cChild);
      this.myUser.save().then(res => {
        this.nav.back();
      });

    }

  }

}

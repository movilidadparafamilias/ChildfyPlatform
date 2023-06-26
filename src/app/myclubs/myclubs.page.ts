import { Component, OnInit } from '@angular/core';
import { ConnectionService } from '../services/connection/connection.service';
import { ModalController, NavController } from '@ionic/angular';
import { ClubCodePage } from '../club-code/club-code.page';
import { DisplayService } from '../services/display/display.service';

@Component({
  selector: 'app-myclubs',
  templateUrl: './myclubs.page.html',
  styleUrls: ['./myclubs.page.scss'],
})
export class MyclubsPage implements OnInit {

  loggedUser: any;
  clubsList = [];
  displayService: any;
  constructor(private conn: ConnectionService, private nav: NavController, private modalCtrl: ModalController, private displaySvc: DisplayService) {
    this.displayService = this.displaySvc;
  }

  ngOnInit() {
  }

  ionViewWillEnter() {

    this.getUser();

  }

  async getUser() {
    this.loggedUser = await this.conn.getUserDetails();
    var clubs = this.loggedUser.get("myClubs")
    this.clubsList = clubs;
    for (let t of this.clubsList) {
      t.fetch();
    }
  }

  async addClub() {
    let a = this;
    const modal = await this.modalCtrl.create({
      component: ClubCodePage,
      componentProps: {
      }
    });

    modal.onDidDismiss().then(() => {
      this.getUser();
    });

    await modal.present();

  }
}

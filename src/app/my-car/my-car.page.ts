import { Component, OnInit } from '@angular/core';
import { ConnectionService } from '../services/connection/connection.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-my-car',
  templateUrl: './my-car.page.html',
  styleUrls: ['./my-car.page.scss'],
})
export class MyCarPage implements OnInit {

  car: any = {};
  myUser: any;

  constructor(private conn: ConnectionService, private nav: NavController) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.getUser();

  }


  async getUser() {

    this.myUser = await this.conn.getUserDetails();
    this.car = this.myUser.get('car');
    if (!this.car) {
      this.car = {};
    }
  }

  saveProfile() {
    this.myUser.set('car', this.car);

    this.myUser.save().then(res => {

      this.nav.back();
    })

  }

}

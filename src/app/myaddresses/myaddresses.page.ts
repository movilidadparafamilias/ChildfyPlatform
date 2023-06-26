import { Component, OnInit } from '@angular/core';
import { ConnectionService } from '../services/connection/connection.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-myaddresses',
  templateUrl: './myaddresses.page.html',
  styleUrls: ['./myaddresses.page.scss'],
})
export class MyaddressesPage implements OnInit {
  myAdrresses = [];
  myUser: any = {};
  constructor(private conn: ConnectionService, private nav: NavController) { }

  ngOnInit() {
  }

  async getUser() {
    this.myUser = await this.conn.getUserDetails();
    this.myAdrresses = this.myUser.get("myAddresses");
  }

  ionViewWillEnter() {
    this.getUser();
  }


  addAddress() {

    this.nav.navigateForward('/new-address');
  }




}

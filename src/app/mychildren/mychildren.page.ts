import { Component, OnInit } from '@angular/core';
import { ConnectionService } from '../services/connection/connection.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-mychildren',
  templateUrl: './mychildren.page.html',
  styleUrls: ['./mychildren.page.scss'],
})
export class MychildrenPage implements OnInit {

  myUser: any;
  childrenList = [];

  constructor(private conn: ConnectionService, private nav: NavController) {


  }

  ionViewWillEnter() {
    this.getUser();
  }


  ngOnInit() {
  }

  addChildren() {


    this.nav.navigateForward('/new-children');

  }


  async getUser() {
    this.myUser = await this.conn.getUserDetails();
    this.childrenList = this.myUser.get("myChildrens");

    if (!this.childrenList) {
      this.childrenList = [];
      this.myUser.set("myChildrens", this.childrenList);
    }
  }

}

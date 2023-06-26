import { Component, OnInit } from '@angular/core';
import { ConnectionService } from '../services/connection/connection.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.page.html',
  styleUrls: ['./myprofile.page.scss'],
})
export class MyprofilePage implements OnInit {
  user: any = {};
  myUser: any;
  constructor(private conn: ConnectionService, private nav: NavController) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.getUser();

  }

  async getUser() {

    this.myUser = await this.conn.getUserDetails();
    this.user.name = this.myUser.get('name');
    this.user.dni = this.myUser.get('dni');
    this.user.surname = this.myUser.get('surname');
    this.user.date = this.myUser.get('bdate')
    this.user.lngCode = this.myUser.get('lngCode');
  }

  saveProfile() {
    this.myUser.set('name', this.user.name);
    this.myUser.set('surname', this.user.surname);
    this.myUser.set('bdate', this.user.date);
    this.myUser.set('dni', this.user.dni);
    this.myUser.set('lngCode', this.user.lngCode);

    this.myUser.save().then(res => {
      this.conn.setLng(this.user.lngCode);
      this.nav.back();
    })

  }




}

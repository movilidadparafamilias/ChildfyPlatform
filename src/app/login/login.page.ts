import { Component, OnInit } from '@angular/core';
import { ConnectionService } from '../services/connection/connection.service';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginData = { email: "", password: "" }
  selectedLng = "es";

  constructor(private conn: ConnectionService, private nav: NavController, private router: Router) { }

  ngOnInit() {
  }


  login() {

    this.conn.login(this.loginData).then(res => {
      if (res) {
        this.loginData = { email: "", password: "" }
        this.nav.navigateRoot('/tabs');

      }
    })
  }
  changeLanguage() {
    this.conn.setLng(this.selectedLng);
  }
}

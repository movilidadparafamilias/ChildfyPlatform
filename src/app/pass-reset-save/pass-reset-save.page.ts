import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ConnectionService } from '../services/connection/connection.service';

@Component({
  selector: 'app-pass-reset-save',
  templateUrl: './pass-reset-save.page.html',
  styleUrls: ['./pass-reset-save.page.scss'],
})
export class PassResetSavePage implements OnInit {

  email = "";
  password = "";
  rpassword = "";
  pcode = "";

  constructor(private router: Router, private nav: NavController, private conn: ConnectionService) { }

  ngOnInit() {
  }

  saveReset() {

    this.email = localStorage.getItem('resetEmail');

    this.conn.saveNewPassword(this.email, this.password, this.pcode);

    this.nav.navigateRoot('/welcome');
  }

}

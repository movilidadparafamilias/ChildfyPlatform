import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInput, NavController } from '@ionic/angular';
import { ConnectionService } from '../services/connection/connection.service';

@Component({
  selector: 'app-code-input',
  templateUrl: './code-input.page.html',
  styleUrls: ['./code-input.page.scss'],
})
export class CodeInputPage implements OnInit {
  @ViewChild('autofocus', { static: false }) fakeField: IonInput;

  pinCode;
  icon1 = "radio-button-off";
  icon2 = "radio-button-off";
  icon3 = "radio-button-off";
  icon4 = "radio-button-off";
  icon5 = "radio-button-off";
  icon6 = "radio-button-off";

  c1 = "";
  c2 = "";
  c3 = "";
  c4 = "";

  showError = false;

  constructor(private conn: ConnectionService, private nav: NavController) { }

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.goFocus();
  }

  goFocus() {
    setTimeout(() => this.fakeField.setFocus(), 200);

  }
  pinUpdate(event) {
    setTimeout(() => this.pinCode = event.target.value.length >= 4 ? event.target.value.substring(0, 4) : event.target.value, 1);

    if (event.target.value.length == 0) {
      this.c1 = "";
      this.c2 = "";
      this.c3 = "";
      this.c4 = "";
    }
    if (event.target.value.length == 1) {
      this.showError = false;
      this.c1 = event.target.value.charAt(0);
      this.c2 = "";
      this.c3 = "";
      this.c4 = "";
    }
    if (event.target.value.length == 2) {
      this.c1 = event.target.value.charAt(0);
      this.c2 = event.target.value.charAt(1);
      this.c3 = "";
      this.c4 = "";
    }

    if (event.target.value.length == 3) {
      this.c1 = event.target.value.charAt(0);
      this.c2 = event.target.value.charAt(1);
      this.c3 = event.target.value.charAt(2);
      this.c4 = "";
    }

    if (event.target.value.length == 4) {
      this.c1 = event.target.value.charAt(0);
      this.c2 = event.target.value.charAt(1);
      this.c3 = event.target.value.charAt(2);
      this.c4 = event.target.value.charAt(3);;

      this.verifyPin();
    }
  }
  async verifyPin() {
    this.conn.verifyCode(this.pinCode).then(res => {

      if (res == false) {
        this.pinCode = "";
        this.showError = true;
      }
      else {
        this.conn.approveUser().then(res => {
          this.nav.navigateRoot('/tabs');
        })
      }
    })


  }
  resendAction() {

  }

}

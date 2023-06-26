import { Component, OnInit } from '@angular/core';
import { ConnectionService } from '../services/connection/connection.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  userData = {
    name: "",
    email: "",
    password: "",
    rePassword: "",
    isChecked: false,
    isChecked_aviso: false
  }

  selectedLng = "es";

  constructor(private conn: ConnectionService, private nav: NavController) { }

  ngOnInit() {

  }

  signup() {
    if (this.userData.isChecked && this.userData.isChecked_aviso) {
      this.conn.signup(this.userData).then(res => {
        if (res) {
          this.nav.navigateForward('/tabs');
        }
      })
    }
    else {

      this.conn.showAlertWithText("", "Confirma que has leído nuestra política de privacidad.");
      //show allert
    }
  }

  changeLanguage() {
    this.conn.setLng(this.selectedLng);
  }


}

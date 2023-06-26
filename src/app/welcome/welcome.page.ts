import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ConnectionService } from '../services/connection/connection.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  constructor(private nav: NavController, private conn: ConnectionService) {

    conn.checkLng();
    this.nav.navigateForward('/tabs');
  }

  ngOnInit() {



  }

  continue() {
    this.nav.navigateForward('/login', { skipLocationChange: true });
  }




}

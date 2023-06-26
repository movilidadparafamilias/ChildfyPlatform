import { Component, OnInit } from '@angular/core';
import { ConnectionService } from '../services/connection/connection.service';
import { ActivatedRoute } from '@angular/router';
import { DisplayService } from '../services/display/display.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.page.html',
  styleUrls: ['./user-details.page.scss'],
})
export class UserDetailsPage implements OnInit {

  selUser: any;
  clubsList = [];
  childList = [];
  addressList = [];
  car: any = {};
  displayService: any;

  constructor(private conn: ConnectionService, private route: ActivatedRoute, private displaySvc: DisplayService) {
    this.displayService = this.displaySvc;
    this.route.params.subscribe(params => {
      this.getUser(params['id']);

    });

  }

  ngOnInit() {
  }

  calculateAge(b) { // birthday is a date
    let birthday = new Date(b);
    let ageDifMs = Date.now() - birthday.getTime();
    let ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  async getUser(id) {

    this.conn.getUserById(id).then(res => {
      if (res.length > 0) {
        this.selUser = res[0];
        this.addressList = this.selUser.get("myAddresses");
        this.childList = this.selUser.get("myChildrens");
        this.car = this.selUser.get('car');

        this.clubsList = this.selUser.get("myClubs")
        for (let t of this.clubsList) {
          t.fetch();
        }
      }
    });

  }

}

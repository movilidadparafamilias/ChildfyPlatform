import { Component } from '@angular/core';
import { ConnectionService } from '../services/connection/connection.service';
import { DisplayService } from '../services/display/display.service';

@Component({
  selector: 'app-clubs',
  templateUrl: './clubs.page.html',
  styleUrls: ['./clubs.page.scss'],
})
export class ClubsPage {

  clubsList = [];
  curentPage = 0;
  searchTerm = "";
  myClubsList = [];
  myUser: any;
  displayService: any;

  constructor(private conn: ConnectionService, private displaySvc: DisplayService) { this.displayService = this.displaySvc }

  ionViewWillEnter() {
    this.getData();
  }

  async getData() {
    let user = await this.conn.getUserDetails();
    var clubs = user.get("myClubs")
    this.clubsList = clubs;
    for (let t of this.clubsList) {
      t.fetch();
    }
  }

  loadData(event) {
    this.curentPage++;
    this.getData();
    event.target.complete();
  }

  sugest() {
    if (this.searchTerm.length == 0) {
      this.clubsList = [];
      this.curentPage = 0;
      this.getData();
    }
    else {
      this.conn.searchAcademia(this.searchTerm).then(res => {
        this.clubsList = res;
      })
    }
  }
}

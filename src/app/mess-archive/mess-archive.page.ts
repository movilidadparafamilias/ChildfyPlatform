import { Component, OnInit } from '@angular/core';
import { ConnectionService } from '../services/connection/connection.service';

@Component({
  selector: 'app-mess-archive',
  templateUrl: './mess-archive.page.html',
  styleUrls: ['./mess-archive.page.scss'],
})
export class MessArchivePage implements OnInit {

  chatsList = [];
  curentPage = 0;
  myUser: any;

  constructor(private conn: ConnectionService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getMyUser();

  }
  async getMyUser() {

    this.myUser = await this.conn.getUserDetails();
    this.getMyChats();
  }
  async getMyChats() {

    this.conn.getConversationsArchive(this.curentPage).then(async res => {
      this.chatsList = res;
      for (let c of this.chatsList) {
        let lastMessage = await this.conn.getLastMessagesForConversation(c);


        if (lastMessage[0].get('sender').id !== this.myUser.id) {
          if (lastMessage[0].get("viewer").some(viewer => viewer.id == this.myUser.id)) {

            c.set('unread', false);
          }
          else {
            c.set('unread', true);
          }
        }
        else {
          c.set('unread', false);
        }
        c.set("last", lastMessage[0]);
        var members = c.get('members');
        for (let m of members) {
          if (m.id != this.myUser.id) {
            m.fetch();
          }
        }
      }
    })

  }

  Archive(c) {

    let archive = c.get('Archive');
    const index = archive.findIndex(x => x.id == this.myUser.id);
    if (index > -1) {
      archive.splice(index, 1);
    }

    c.set('Archive', archive);
    c.save().then(res => {
      this.getMyChats();
    })
  }

  showArchive() {


  }

  getTheOther(c) {
    var members = c.get('members');
    for (let m of members) {
      if (m.id != this.myUser.id) {
        return m.get('name');
      }
    }


  }


}

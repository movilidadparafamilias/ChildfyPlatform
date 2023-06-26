import { Component, OnInit } from '@angular/core';
import { ConnectionService } from '../services/connection/connection.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss'],
})
export class MessagesPage implements OnInit {

  chatsList = [];
  curentPage = 0;
  myUser: any;

  constructor(private conn: ConnectionService) {


  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    ConnectionService.showBadge = false;
    this.getMyUser();

  }
  async getMyUser() {

    this.myUser = await this.conn.getUserDetails();
    this.getMyChats();
  }
  async getMyChats() {

    this.conn.getConversations(this.curentPage).then(async res => {
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
    if (archive.some(viewer => viewer.id == this.myUser.id)) {
      return;
    }
    else {
      archive.push(this.myUser);
    }

    c.set('Archive', archive);
    c.save().then(res => {
      this.getMyChats();
    })

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

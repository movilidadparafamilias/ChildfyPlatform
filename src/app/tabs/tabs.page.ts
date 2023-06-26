import { Component } from '@angular/core';
import { ConnectionService } from '../services/connection/connection.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  showNewMessage = false;
  public classReference = ConnectionService;

  constructor() { }

}

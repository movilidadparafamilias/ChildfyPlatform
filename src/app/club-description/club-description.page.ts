import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-club-description',
  templateUrl: './club-description.page.html',
  styleUrls: ['./club-description.page.scss'],
})
export class ClubDescriptionPage {

  @Input() selAcademia: any;

  constructor(private modalCtrl: ModalController) { }

  close() {
    this.modalCtrl.dismiss();
  }

}

import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-driver-doc-data-input',
  templateUrl: './driver-doc-data-input.page.html',
  styleUrls: ['./driver-doc-data-input.page.scss'],
})
export class DriverDocDataInputPage {

  @Input() docData: any;

  constructor(private modalCtrl: ModalController) { }

  saveData() {
    this.modalCtrl.dismiss({
      'docData': this.docData
    });
  }

  cancel() {
    this.modalCtrl.dismiss();
  }

}

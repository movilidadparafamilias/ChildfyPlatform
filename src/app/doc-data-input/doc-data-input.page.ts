import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-doc-data-input',
  templateUrl: './doc-data-input.page.html',
  styleUrls: ['./doc-data-input.page.scss'],
})
export class DocDataInputPage {


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

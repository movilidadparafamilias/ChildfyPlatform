import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DriverDocDataInputPageRoutingModule } from './driver-doc-data-input-routing.module';

import { DriverDocDataInputPage } from './driver-doc-data-input.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    DriverDocDataInputPageRoutingModule
  ],
  declarations: [DriverDocDataInputPage]
})
export class DriverDocDataInputPageModule {}

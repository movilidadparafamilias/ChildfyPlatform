import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DocDataInputPageRoutingModule } from './doc-data-input-routing.module';

import { DocDataInputPage } from './doc-data-input.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    DocDataInputPageRoutingModule
  ],
  declarations: [DocDataInputPage]
})
export class DocDataInputPageModule {}

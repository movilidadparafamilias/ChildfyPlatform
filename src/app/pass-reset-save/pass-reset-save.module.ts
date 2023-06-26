import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PassResetSavePageRoutingModule } from './pass-reset-save-routing.module';

import { PassResetSavePage } from './pass-reset-save.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    PassResetSavePageRoutingModule
  ],
  declarations: [PassResetSavePage]
})
export class PassResetSavePageModule {}

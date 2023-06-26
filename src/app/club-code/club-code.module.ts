import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClubCodePageRoutingModule } from './club-code-routing.module';

import { ClubCodePage } from './club-code.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    ClubCodePageRoutingModule
  ],
  declarations: [ClubCodePage]
})
export class ClubCodePageModule {}

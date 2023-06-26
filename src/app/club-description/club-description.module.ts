import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClubDescriptionPageRoutingModule } from './club-description-routing.module';

import { ClubDescriptionPage } from './club-description.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClubDescriptionPageRoutingModule,
  TranslateModule  ],
  declarations: [ClubDescriptionPage]
})
export class ClubDescriptionPageModule {}

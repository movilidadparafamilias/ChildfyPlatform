import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClubsPageRoutingModule } from './clubs-routing.module';

import { ClubsPage } from './clubs.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    ClubsPageRoutingModule
  ],
  declarations: [ClubsPage]
})
export class ClubsPageModule {}

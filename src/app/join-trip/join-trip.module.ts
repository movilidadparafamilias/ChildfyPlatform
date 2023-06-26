import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JoinTripPageRoutingModule } from './join-trip-routing.module';

import { JoinTripPage } from './join-trip.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    JoinTripPageRoutingModule
  ],
  declarations: [JoinTripPage]
})
export class JoinTripPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TripRequestPageRoutingModule } from './trip-request-routing.module';

import { TripRequestPage } from './trip-request.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    TripRequestPageRoutingModule
  ],
  declarations: [TripRequestPage]
})
export class TripRequestPageModule {}

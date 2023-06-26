import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SugestClubPageRoutingModule } from './sugest-club-routing.module';

import { SugestClubPage } from './sugest-club.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SugestClubPageRoutingModule
  ],
  declarations: [SugestClubPage]
})
export class SugestClubPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyclubsPageRoutingModule } from './myclubs-routing.module';

import { MyclubsPage } from './myclubs.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    MyclubsPageRoutingModule
  ],
  declarations: [MyclubsPage]
})
export class MyclubsPageModule {}

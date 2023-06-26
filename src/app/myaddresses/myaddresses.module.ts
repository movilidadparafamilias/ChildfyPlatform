import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyaddressesPageRoutingModule } from './myaddresses-routing.module';

import { MyaddressesPage } from './myaddresses.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    MyaddressesPageRoutingModule
  ],
  declarations: [MyaddressesPage]
})
export class MyaddressesPageModule {}

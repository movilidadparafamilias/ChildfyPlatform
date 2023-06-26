import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MychildrenPageRoutingModule } from './mychildren-routing.module';

import { MychildrenPage } from './mychildren.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    MychildrenPageRoutingModule
  ],
  declarations: [MychildrenPage]
})
export class MychildrenPageModule {}

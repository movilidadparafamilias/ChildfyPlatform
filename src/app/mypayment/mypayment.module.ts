import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MypaymentPageRoutingModule } from './mypayment-routing.module';

import { MypaymentPage } from './mypayment.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    MypaymentPageRoutingModule
  ],
  declarations: [MypaymentPage]
})
export class MypaymentPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PassResetRequestPageRoutingModule } from './pass-reset-request-routing.module';

import { PassResetRequestPage } from './pass-reset-request.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    PassResetRequestPageRoutingModule
  ],
  declarations: [PassResetRequestPage]
})
export class PassResetRequestPageModule {}

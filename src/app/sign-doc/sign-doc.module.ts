import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignDocPageRoutingModule } from './sign-doc-routing.module';

import { SignDocPage } from './sign-doc.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    SignDocPageRoutingModule
  ],
  declarations: [SignDocPage]
})
export class SignDocPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CodeInputPageRoutingModule } from './code-input-routing.module';

import { CodeInputPage } from './code-input.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    CodeInputPageRoutingModule
  ],
  declarations: [CodeInputPage]
})
export class CodeInputPageModule {}

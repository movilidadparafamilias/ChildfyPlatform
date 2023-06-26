import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReviewDocPageRoutingModule } from './review-doc-routing.module';

import { ReviewDocPage } from './review-doc.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReviewDocPageRoutingModule,
    TranslateModule
  ],
  declarations: [ReviewDocPage]
})
export class ReviewDocPageModule {}

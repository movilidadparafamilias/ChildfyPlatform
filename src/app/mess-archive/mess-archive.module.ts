import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MessArchivePageRoutingModule } from './mess-archive-routing.module';

import { MessArchivePage } from './mess-archive.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    MessArchivePageRoutingModule
  ],
  declarations: [MessArchivePage]
})
export class MessArchivePageModule {}

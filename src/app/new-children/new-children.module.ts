import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewChildrenPageRoutingModule } from './new-children-routing.module';

import { NewChildrenPage } from './new-children.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    NewChildrenPageRoutingModule
  ],
  declarations: [NewChildrenPage]
})
export class NewChildrenPageModule {}

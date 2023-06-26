import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MychildrenPage } from './mychildren.page';

const routes: Routes = [
  {
    path: '',
    component: MychildrenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MychildrenPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyaddressesPage } from './myaddresses.page';

const routes: Routes = [
  {
    path: '',
    component: MyaddressesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyaddressesPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyCarPage } from './my-car.page';

const routes: Routes = [
  {
    path: '',
    component: MyCarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyCarPageRoutingModule {}

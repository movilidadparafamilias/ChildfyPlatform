import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MypaymentPage } from './mypayment.page';

const routes: Routes = [
  {
    path: '',
    component: MypaymentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MypaymentPageRoutingModule {}

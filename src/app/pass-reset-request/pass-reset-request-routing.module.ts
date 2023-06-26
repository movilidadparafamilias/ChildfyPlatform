import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PassResetRequestPage } from './pass-reset-request.page';

const routes: Routes = [
  {
    path: '',
    component: PassResetRequestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PassResetRequestPageRoutingModule {}

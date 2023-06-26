import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JoinTripPage } from './join-trip.page';

const routes: Routes = [
  {
    path: '',
    component: JoinTripPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JoinTripPageRoutingModule {}

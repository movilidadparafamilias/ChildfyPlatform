import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DriverDocDataInputPage } from './driver-doc-data-input.page';

const routes: Routes = [
  {
    path: '',
    component: DriverDocDataInputPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DriverDocDataInputPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DocDataInputPage } from './doc-data-input.page';

const routes: Routes = [
  {
    path: '',
    component: DocDataInputPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DocDataInputPageRoutingModule {}

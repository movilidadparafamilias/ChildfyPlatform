import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyclubsPage } from './myclubs.page';

const routes: Routes = [
  {
    path: '',
    component: MyclubsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyclubsPageRoutingModule {}

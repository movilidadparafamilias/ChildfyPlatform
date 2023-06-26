import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SugestClubPage } from './sugest-club.page';

const routes: Routes = [
  {
    path: '',
    component: SugestClubPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SugestClubPageRoutingModule {}

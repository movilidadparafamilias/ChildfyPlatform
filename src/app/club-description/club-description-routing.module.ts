import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClubDescriptionPage } from './club-description.page';

const routes: Routes = [
  {
    path: '',
    component: ClubDescriptionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClubDescriptionPageRoutingModule {}

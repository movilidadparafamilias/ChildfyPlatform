import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClubCodePage } from './club-code.page';

const routes: Routes = [
  {
    path: '',
    component: ClubCodePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClubCodePageRoutingModule {}

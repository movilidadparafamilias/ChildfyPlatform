import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PassResetSavePage } from './pass-reset-save.page';

const routes: Routes = [
  {
    path: '',
    component: PassResetSavePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PassResetSavePageRoutingModule {}

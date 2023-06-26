import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignDocPage } from './sign-doc.page';

const routes: Routes = [
  {
    path: '',
    component: SignDocPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SignDocPageRoutingModule {}

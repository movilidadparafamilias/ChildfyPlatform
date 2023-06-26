import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewChildrenPage } from './new-children.page';

const routes: Routes = [
  {
    path: '',
    component: NewChildrenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewChildrenPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MessArchivePage } from './mess-archive.page';

const routes: Routes = [
  {
    path: '',
    component: MessArchivePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MessArchivePageRoutingModule {}

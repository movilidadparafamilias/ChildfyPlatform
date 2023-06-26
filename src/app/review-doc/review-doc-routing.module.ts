import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReviewDocPage } from './review-doc.page';

const routes: Routes = [
  {
    path: '',
    component: ReviewDocPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReviewDocPageRoutingModule {}

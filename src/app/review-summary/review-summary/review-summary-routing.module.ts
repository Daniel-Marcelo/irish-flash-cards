import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReviewSummaryPage } from './review-summary.page';

const routes: Routes = [
  {
    path: '',
    component: ReviewSummaryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReviewSummaryPageRoutingModule {}

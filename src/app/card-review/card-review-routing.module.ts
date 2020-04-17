import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CardReviewPage } from './card-review.page';

const routes: Routes = [
  {
    path: '',
    component: CardReviewPage
  },
  {
    path: 'review-summary',
    loadChildren: () => import('../review-summary/review-summary/review-summary.module').then( m => m.ReviewSummaryPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CardReviewPageRoutingModule {}

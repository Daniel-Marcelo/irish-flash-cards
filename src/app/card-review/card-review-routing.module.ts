import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CardReviewPage } from './card-review.page';

const routes: Routes = [
  {
    path: ':cardId',
    component: CardReviewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CardReviewPageRoutingModule {}

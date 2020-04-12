import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeckSummaryPage } from './deck-summary.page';

const routes: Routes = [
  {
    path: ':deckId',
    component: DeckSummaryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeckSummaryRoutingModule {}

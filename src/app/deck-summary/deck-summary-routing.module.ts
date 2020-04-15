import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeckSummaryPage } from './deck-summary.page';

const routes: Routes = [
  {
    path: ':deckId',
    component: DeckSummaryPage
  },
  {
    path: ':deckId/create-card',
    loadChildren: () => import('../create-card/create-card.module').then( m => m.CreateCardPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeckSummaryRoutingModule {}
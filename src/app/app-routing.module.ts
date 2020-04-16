import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'decks',
    pathMatch: 'full'
  },
  {
    path: 'decks',
    loadChildren: () => import('./decks/decks.module').then( m => m.DecksPageModule)
  },
  {
    path: 'card',
    loadChildren: () => import('./card/card.module').then( m => m.CardPageModule)
  },
  {
    path: 'deck-summary',
    loadChildren: () => import('./deck-summary/deck-summary.module').then( m => m.DeckSummaryPageModule)
  },
  {
    path: 'create-deck',
    loadChildren: () => import('./create-deck/create-deck.module').then( m => m.CreateDeckPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

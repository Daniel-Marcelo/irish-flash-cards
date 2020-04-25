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
    path: 'deck-summary',
    loadChildren: () => import('./deck-summary/deck-summary.module').then( m => m.DeckSummaryPageModule)
  },
  {
    path: 'create-deck',
    loadChildren: () => import('./create-deck/create-deck.module').then( m => m.CreateDeckPageModule)
  },
  {
    path: 'create-deck/:parentDeckId',
    loadChildren: () => import('./create-deck/create-deck.module').then( m => m.CreateDeckPageModule)
  },
  {
    path: 'edit-deck/:deckId',
    loadChildren: () => import('./pages/edit-deck/edit-deck.module').then( m => m.EditDeckPageModule)
  },
  {
    path: 'edit-card/:cardId',
    loadChildren: () => import('./pages/edit-card/edit-card.module').then( m => m.EditCardPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeckSummaryPage } from './deck-summary.page';
import { DeckSummaryRoutingModule } from './deck-summary-routing.module';
import { DecksListModule } from '../components/decks-list/decks-list.module';
import { DeckNameTitleModule } from '../components/deck-name-title/deck-name-title.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeckSummaryRoutingModule,
    DecksListModule,
    DeckNameTitleModule
  ],
  declarations: [DeckSummaryPage]
})
export class DeckSummaryPageModule {}

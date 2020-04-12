import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DecksPageRoutingModule } from './decks-routing.module';

import { DecksPage } from './decks.page';
import { DeckSummaryPageModule } from '../deck-summary/deck-summary.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DecksPageRoutingModule,
    DeckSummaryPageModule
  ],
  declarations: [DecksPage]
})
export class DecksPageModule {}

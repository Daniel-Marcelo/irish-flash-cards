import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DecksPageRoutingModule } from './decks-routing.module';

import { DecksPage } from './decks.page';
import { DeckSummaryPageModule } from '../deck-summary/deck-summary.module';
import { DeleteCardVerificationComponent } from '../delete-card-verification/delete-card-verification.component';
  import { DecksListModule } from '../components/decks-list/decks-list.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DecksPageRoutingModule,
    DeckSummaryPageModule,
    DecksListModule
  ],
  entryComponents: [DeleteCardVerificationComponent],
  declarations: [DecksPage, DeleteCardVerificationComponent],
})
export class DecksPageModule {}

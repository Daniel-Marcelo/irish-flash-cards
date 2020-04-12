import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeckSummaryPage } from './deck-summary.page';
import { DeckSummaryRoutingModule } from './deck-summary-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeckSummaryRoutingModule
  ],
  declarations: [DeckSummaryPage]
})
export class DeckSummaryPageModule {}

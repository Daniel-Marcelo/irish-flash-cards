import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DecksPageRoutingModule } from './decks-routing.module';

import { DecksPage } from './decks.page';
import { DeckSummaryPageModule } from '../deck-summary/deck-summary.module';
import { Dialogs } from '@ionic-native/dialogs/ngx';
import { DeleteCardVerificationComponent } from '../delete-card-verification/delete-card-verification.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DecksPageRoutingModule,
    DeckSummaryPageModule
  ],
  entryComponents: [DeleteCardVerificationComponent],
  declarations: [DecksPage, DeleteCardVerificationComponent],
  providers: [Dialogs]
})
export class DecksPageModule {}

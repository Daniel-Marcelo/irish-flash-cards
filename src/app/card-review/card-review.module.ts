import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CardReviewPageRoutingModule } from './card-review-routing.module';

import { CardReviewPage } from './card-review.page';
import { CardFlipComponent } from '../card-flip/card-flip.component';
import { DeckNameTitleModule } from '../components/deck-name-title/deck-name-title.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CardReviewPageRoutingModule,
    DeckNameTitleModule
  ],
  declarations: [CardReviewPage, CardFlipComponent]
})
export class CardReviewPageModule {}

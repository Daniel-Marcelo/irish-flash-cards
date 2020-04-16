import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CardReviewPageRoutingModule } from './card-review-routing.module';

import { CardReviewPage } from './card-review.page';
import { CardFlipComponent } from '../card-flip/card-flip.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CardReviewPageRoutingModule
  ],
  declarations: [CardReviewPage, CardFlipComponent]
})
export class CardReviewPageModule {}

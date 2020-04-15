import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CardReviewPageRoutingModule } from './card-review-routing.module';

import { CardReviewPage } from './card-review.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CardReviewPageRoutingModule
  ],
  declarations: [CardReviewPage]
})
export class CardReviewPageModule {}

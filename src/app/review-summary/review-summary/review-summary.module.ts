import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReviewSummaryPageRoutingModule } from './review-summary-routing.module';

import { ReviewSummaryPage } from './review-summary.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReviewSummaryPageRoutingModule
  ],
  declarations: [ReviewSummaryPage]
})
export class ReviewSummaryPageModule {}

import { Injectable } from '@angular/core';
import { Card } from '../card/card.model';
import { ReviewDifficulty, ReviewInfo, CardReview } from '../card-review/card-review.model';
import { DataStoreService } from '../data-store/data-store.service';
import { tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReviewProcessorService {

  public static readonly allCardReviews = 'card-review';
  private cardReviews: CardReview[] = [];
  constructor(private dataStore: DataStoreService) { }

  processCardReview(card: Card, level: ReviewDifficulty){
    this.dataStore.get<CardReview>(`${ReviewProcessorService.allCardReviews}-${card.id}`).pipe(
      map(cardReview => cardReview || { card, reviewInfo: [] } as CardReview),
      tap(cardReview => cardReview.reviewInfo.push(new ReviewInfo(level)))
    ).subscribe(
      cardReview => this.updateReview(cardReview)
    )
  }

  private updateReview(cardReview: CardReview) {
    this.dataStore.set(`${ReviewProcessorService.allCardReviews}-${cardReview.card.id}`, cardReview)
    .subscribe(
      cardReview => console.log('SAVED'+ cardReview)
    )
  }

  private findCardReview(cardReviews: CardReview[], card: Card): CardReview {
    return cardReviews.find(review => review.card.id === card.id) || { card, reviewInfo: [] } as CardReview
  }
}

// import { Injectable } from '@angular/core';
// import { BehaviorSubject, Observable, Subject } from 'rxjs';
// import { Card } from '../card/card.model';
// import { CardService } from '../card/card.service';
// import { map, filter, first, distinctUntilChanged } from 'rxjs/operators';
// import { ReviewDifficulty } from './card-review.model';
// import { Router } from '@angular/router';

// @Injectable({
//   providedIn: 'root'
// })
// export class CardReviewService {

//   private cardsToBeReviewed: Card[] = [];

//   public cardUnderReview$: Observable<Card>;
//   private cardUnderReview = new BehaviorSubject<Card>(null);

//   public reviewComplete$: Observable<void>;
//   private reviewComplete = new Subject<void>();

//   constructor(private cardService: CardService, private router: Router) {
//     this.cardUnderReview$ = this.cardUnderReview.asObservable().pipe(filter(card => !!card))
//   }

//   getNextCard() {
//     const [firstCard, ...cards] = this.cardsToBeReviewed;
//     this.cardUnderReview.next(firstCard);
//     this.cardsToBeReviewed = cards || [];
//   }

//   loadCardsForReview(deckId: string): Observable<Card[]> {
//    return this.cardService.getCardsInDeck(deckId).pipe(
//       map(cards => this.cardsToBeReviewed = cards || [])
//     );
//   }

//   reviewed(level: ReviewDifficulty) {
//     this.reviewProcessor.processCardReview(this.cardUnderReview.getValue(), level);
//     if (this.noCardsToReview()) {
//       this.router.navigateByUrl(this.router.url + '/review-summary')
//     } else {
//       this.getNextCard();
//     }
//   }

//   private noCardsToReview() {
//     return this.cardsToBeReviewed.length === 0;
//   }
// }

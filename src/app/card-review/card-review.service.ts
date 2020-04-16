import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Card } from '../card/card.model';
import { CardService } from '../card/card.service';
import { map, filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CardReviewService {

  public cards$: Observable<Card[]>;
  private cardsToBeReviewed = new BehaviorSubject<Card[]>([]);

  constructor(private cardService: CardService) {
    this.cards$ = this.cardsToBeReviewed.asObservable().pipe(filter(cards => cards.length > 0));
  }

  getCardToReview(cardNo: string): Observable<Card> {
    return this.cards$.pipe(map(cards => cards[+cardNo]));
  }

  beginReview(deckId: string): void {
    this.cardService.getCardsInDeck(deckId).subscribe(
      cards => this.cardsToBeReviewed.next(cards || [])
    );
  }
}

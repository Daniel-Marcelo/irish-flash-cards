import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CardService } from '../card/card.service';
import { map } from 'rxjs/operators';
import { ReviewDifficulty, CardReview } from './card-review.model';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { Card } from '../card/card.model';
import { Doc, BaseFirestore } from '../base-firestore';

@Injectable({
  providedIn: 'root'
})
export class CardReviewService extends BaseFirestore<CardReview> {

  public reviews$: Observable<CardReview[]>;
  private reviewCollection: AngularFirestoreCollection<CardReview>;

  private cardsToBeReviewed: Doc<Card>[] = [];

  constructor(db: AngularFirestore, private cardService: CardService, private router: Router) {
    super(db, 'cardReview')
  }

  getCardForReview() {
    const [cardToReview, ...remainingCards] = this.cardsToBeReviewed;
    this.cardsToBeReviewed = remainingCards;
    return cardToReview;
  }

  loadCardsForReview(deckId: string) {
    return this.cardService.getCardsInDeck(deckId).pipe(map(
            cards => this.cardsToBeReviewed = cards || []
    ));
  }

  getReviewsForCardId(cardId: string) {
    return this.db.collection('cardReview', ref=> ref.where('cardId', '==', cardId)).valueChanges({idField: 'id'})
  }

  reviewed(card: Doc<Card>, level: ReviewDifficulty) {
    const review = { cardId: card.id, date: new Date(), level } as CardReview;
    this.create(review);

    if (this.cardsToBeReviewed.length === 0) {
      this.router.navigateByUrl('/decks');
    } else {
      this.router.navigateByUrl(this.router.url.replace(`card-review/${card.id}`,`card-review/${this.cardsToBeReviewed[0].id}`));
    }
  }
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CardDoc } from '../card/card.model';
import { CardService } from '../card/card.service';
import { map } from 'rxjs/operators';
import { ReviewDifficulty, CardReview } from './card-review.model';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFirestoreCollection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CardReviewService {

  public reviews$: Observable<CardReview[]>;
  private reviewCollection: AngularFirestoreCollection<CardReview>;

  private cardsToBeReviewed: CardDoc[] = [];

  constructor(private db: AngularFirestore, private cardService: CardService, private router: Router) {
    this.reviewCollection = this.db.collection<CardReview>('cardReview');
    this.reviews$ = this.reviewCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
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

  getReview(id: string) {
    return this.reviewCollection.doc<CardReview>(id).valueChanges();
  }

  createReview(review: CardReview) {
    return this.reviewCollection.add(review);
  }

  updateReview(review: CardReview, id: string) {
    return this.reviewCollection.doc<CardReview>(id).update(review);
  }

  deleteReview(id: string) {
    return this.reviewCollection.doc<CardReview>(id).delete();
  }

  reviewed(card: CardDoc, level: ReviewDifficulty) {
    const review = { cardId: card.id, date: new Date(), level } as CardReview;
    this.createReview(review);

    if (this.cardsToBeReviewed.length === 0) {
      this.router.navigateByUrl('/decks');
    } else {
      this.router.navigateByUrl(this.router.url.replace(`card-review/${card.id}`,`card-review/${this.cardsToBeReviewed[0].id}`));
    }
  }
}

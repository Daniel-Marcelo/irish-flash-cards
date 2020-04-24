import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { Deck } from './deck.model';
import { map, filter, take, pairwise, switchMap, tap } from 'rxjs/operators';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Location } from '@angular/common';
import { Router, NavigationEnd, RoutesRecognized } from '@angular/router';
import { CardService } from '../card/card.service';
import { CardReviewService } from '../card-review/card-review.service';

@Injectable({
  providedIn: 'root'
})
export class DeckService {

  private deckCollection: AngularFirestoreCollection<Deck>;
  public readonly decks$: Observable<Deck[]>;

  constructor(private db: AngularFirestore, private cardService: CardService, private cardReviewService: CardReviewService, private location: Location, private router: Router) {
    this.deckCollection = this.db.collection<Deck>('deck');
    this.decks$ = this.deckCollection.snapshotChanges().pipe(
      mapResponseWithId()
    );

    this.location.subscribe(
      event => {
        this.router.events
          .pipe(filter((e: any) => e instanceof RoutesRecognized),
            pairwise(),
          ).subscribe((e: any) => {
            console.log(e[0].urlAfterRedirects); // previous url
          });
      }
    )
  }

  getParentDecks() {
    return this.db.collection<Deck>('deck', ref => ref.where('immediateParentDeckId', '==', null)).valueChanges({ idField: 'id' });
  }

  getDecksByParentDeckId(parentDeckId: string) {
    return this.db.collection<Deck>('deck', ref => ref.where('immediateParentDeckId', '==', parentDeckId)).valueChanges({ idField: 'id' });
  }

  async createDeck(deck: Deck, immediateParentDeckId: string) {
    if (immediateParentDeckId) {
      deck.immediateParentDeckId = immediateParentDeckId;
      return this.db.firestore.runTransaction(async (t) => {
        const doc = await t.get(this.deckCollection.doc<Deck>(immediateParentDeckId).ref)
        const parentDeck = doc.data() as Deck;
        const id = this.db.createId();
        deck.parentDeckIds = parentDeck.parentDeckIds ? [...parentDeck.parentDeckIds, immediateParentDeckId] : [immediateParentDeckId];
        t.set(this.deckCollection.doc(id).ref, deck);
        return id;
      })
    } else {
      const doc = await this.deckCollection.add(deck);
      return doc.id;
    }
  }

  getDeck(id: string) {
    return this.deckCollection.doc<Deck>(id).valueChanges();
  }

  updateDeck(name: string, id: string) {
    return this.deckCollection.doc<Deck>(id).update({ name });
  }

  deleteDeck(id: string) {
    // let batch = this.db.firestore.batch();
    // const childDecksRef = this.db.collection<Deck>('deck', ref => ref.where('immediateParentDeckId', '==', id));
    // batch.delete(childDecksRef.ref.);
    // Delete all child decks
    // Delete this deck
    // Delete all associated cards
    this.db.collection<Deck>('deck', ref => ref.where('parentDeckIds', 'array-contains', id)).valueChanges({ idField: 'id' }).pipe(take(1)).subscribe(
      decks => {
        decks.forEach(
          deck => {
            this.deleteDeck(deck.id).then(
              d => console.log('Deleted deck')
            );
          }
        )
      }
    )
    this.cardService.getCardsInDeck(id).pipe(take(1)).subscribe(
      cards => {
        cards.forEach(card => {
          this.cardService.delete(card.id);
          this.cardReviewService.getReviewsForCardId(card.id).pipe(take(1)).subscribe(
            cardReviews => cardReviews.forEach(cardReview => {
              this.cardReviewService.deleteReview(cardReview.id).then(
                d => console.log('Deleted your card review '+ JSON.stringify(cardReview))
              );
            })
          )
        })
      }
    )
    return this.deckCollection.doc<Deck>(id).delete();
  }
}

export const mapResponseWithId = () => map((actions: any[]) => {
  return actions.map(a => {
    const data = a.payload.doc.data();
    const id = a.payload.doc.id;
    return { id, ...data };
  });
});
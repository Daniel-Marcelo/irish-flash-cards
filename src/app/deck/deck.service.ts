import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Deck } from './deck.model';
import { map } from 'rxjs/operators';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DeckService {

  private deckCollection: AngularFirestoreCollection<Deck>;
  public readonly decks$: Observable<Deck[]>;

  public selectedDeckIds = new Set<string>();

  constructor(private db: AngularFirestore) {
    this.deckCollection = this.db.collection<Deck>('deck');

    this.decks$ = this.deckCollection.snapshotChanges().pipe(
      mapResponseWithId()
    );
  }

  getParentDecks() {
    return this.db.collection<Deck>('deck', ref => ref.where('parentDeckId', '==', null)).valueChanges({idField: 'id'});
  }

  getDecksByParentDeckId(parentDeckId: string) {
    return this.db.collection<Deck>('deck', ref => ref.where('parentDeckId', '==', parentDeckId)).valueChanges({idField: 'id'});
  }

  createDeck(deck: Deck) {
    return this.deckCollection.add(deck);
  }

  getDeck(id: string) {
    return this.deckCollection.doc<Deck>(id).valueChanges();
  }

  updateDeck(name: string, id: string) {
    return this.deckCollection.doc<Deck>(id).update({ name });
  }

  deleteDeck(id: string) {
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
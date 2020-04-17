import { Injectable } from '@angular/core';
import { DataStoreService } from '../data-store/data-store.service';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { Deck } from './deck.model';
import { v4 as uuidv4 } from 'uuid';
import { tap, switchMap, map, filter } from 'rxjs/operators';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DeckService {

  private deckCollection: AngularFirestoreCollection<Deck>;
  public readonly decks$: Observable<Deck[]>;
  // private decks = new BehaviorSubject<Deck[]>(null);

  constructor(private dataStore: DataStoreService, private db: AngularFirestore) {
    this.deckCollection = this.db.collection<Deck>('decks');

    this.decks$ = this.deckCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  createDeck(deckName: string) {
    return this.deckCollection.add({ name: deckName, id: uuidv4() });
  }

  deckById$(id: string): Observable<Deck> {
    return of({} as any)
  }

  // private loadAllDecks(): void {
  //   this.dataStore.get<Deck[]>(DeckService.allDecksKey).pipe(
  //     map(decks => decks || [])
  //   ).subscribe(dex => this.decks.next(dex));
  // }

  // private setAllDecks(decks: Deck[]): void {
  //   this.dataStore.set(DeckService.allDecksKey, decks).subscribe(console.log);
  // }
}

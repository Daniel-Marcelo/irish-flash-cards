import { Injectable } from '@angular/core';
import { DataStoreService } from '../data-store/data-store.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { Deck } from './deck.model';
import { v4 as uuidv4 } from 'uuid';
import { tap, switchMap, map, filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DeckService {

  public static readonly allDecksKey = 'allDecks';

  decks$: Observable<Deck[]>;
  private decks = new BehaviorSubject<Deck[]>(null);

  constructor(private dataStore: DataStoreService) {
    this.decks$ = this.decks.pipe(filter(decks => !!decks));
    this.loadAllDecks();
  }

  createDeck(deckName: string): void {
    const decks = this.decks.getValue() || [];
    decks.push({ name: deckName, id: uuidv4() });
    this.decks.next(decks);

    this.setAllDecks(decks);
  }

  deckById$(id: string): Observable<Deck> {
    return this.decks$.pipe(map(decks => decks.find(deck => deck.id === id)), filter(deck => !!deck))
  }

  private loadAllDecks(): void {
    this.dataStore.get<Deck[]>(DeckService.allDecksKey).pipe(
      map(decks => decks || [])
    ).subscribe(dex => this.decks.next(dex));
  }
  
  private setAllDecks(decks: Deck[]): void {
    this.dataStore.set(DeckService.allDecksKey, decks).subscribe(console.log);
  }
}

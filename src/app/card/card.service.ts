import { Injectable } from '@angular/core';
import { DataStoreService } from '../data-store/data-store.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Card } from './card.model';
import { filter, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  public static readonly allCards = 'cards';

  public cardsInDeck$: Observable<Card[]>
  private cardsInDeck = new BehaviorSubject<Card[]>([]);

  constructor(private dataStore: DataStoreService) {
    this.cardsInDeck$ = this.cardsInDeck.asObservable();
  }

  getCardsInDeck(deckId: string): Observable<Card[]> {
    this.refreshCards();
    return this.cardsInDeck$.pipe(map(cards => cards.filter(card => card.deckId === deckId)));
  }

  createCardInDeck(card: Card) {
    const cards = this.cardsInDeck.getValue();
    cards.push(card);
    alert(JSON.stringify(cards))
    alert('in service"');
    return this.dataStore.set<Card[]>(CardService.allCards, cards).pipe(tap(cards => {
      alert(JSON.stringify(cards));
      this.cardsInDeck.next(cards || []);
    }
    ));
  }

  private refreshCards() {
    this.dataStore.get<Card[]>(CardService.allCards).subscribe(
      cards => this.cardsInDeck.next(cards || [])
    );
  }
}

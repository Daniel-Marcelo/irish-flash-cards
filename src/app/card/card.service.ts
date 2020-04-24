import { Injectable } from '@angular/core';
import { Card, CardDoc } from './card.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { BaseFirestore } from '../base-firestore';
import { Observable } from 'rxjs';
import { DeckService } from '../deck/deck.service';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CardService extends BaseFirestore<Card> {

  constructor(db: AngularFirestore) {
    super(db, 'card');
  }
  
  getCardsInDeck(deckId: string): Observable<CardDoc[]> {
    return this.db.collection<Card>('card', ref => ref.where('deckIds', 'array-contains', deckId)).valueChanges({idField: 'id'});
  }
}

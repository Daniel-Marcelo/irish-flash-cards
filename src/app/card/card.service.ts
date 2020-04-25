import { Injectable } from '@angular/core';
import { Card } from './card.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { BaseFirestore, Doc } from '../base-firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardService extends BaseFirestore<Card> {

  constructor(db: AngularFirestore) {
    super(db, 'card');
  }
  
  getCardsInDeck(deckId: string): Observable<Doc<Card>[]> {
    return this.db.collection<Card>('card', ref => ref.where('deckIds', 'array-contains', deckId)).valueChanges({idField: 'id'});
  }
}

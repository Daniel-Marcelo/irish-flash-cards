import { Component, OnInit } from '@angular/core';
import { Deck } from '../deck/deck.model';
import { Observable } from 'rxjs';
import { DeckService } from '../deck/deck.service';
import { DeckContextService } from '../services/deck-context.service';

@Component({
  selector: 'app-decks',
  templateUrl: './decks.page.html',
  styleUrls: ['./decks.page.scss'],
})
export class DecksPage implements OnInit {

  decks$: Observable<Deck[]>;
  filterText: string;

  constructor(private deckService: DeckService, private deckContextService: DeckContextService) { }

  ngOnInit() {
    this.decks$ = this.deckService.getParentDecks();
    this.deckContextService.selectedDeckIds = new Set();
  }

  search(event: CustomEvent) {
    console.log(event.detail.target.value);
  }
}

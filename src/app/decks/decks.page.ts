import { Component, OnInit } from '@angular/core';
import { Deck } from '../deck/deck.model';
import { Observable } from 'rxjs';
import { DeckService } from '../deck/deck.service';

@Component({
  selector: 'app-decks',
  templateUrl: './decks.page.html',
  styleUrls: ['./decks.page.scss'],
})
export class DecksPage implements OnInit {

  decks$: Observable<Deck[]>;

  constructor(private deckService: DeckService) { }

  ngOnInit() {
    this.decks$ = this.deckService.decks$ as any;

    this.decks$.subscribe(
      decks => console.log(decks)
    )
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DeckService } from '../deck/deck.service';
import { Deck } from '../deck/deck.model';
import { Observable } from 'rxjs';
import { Card } from '../card/card.model';
import { CardService } from '../card/card.service';

@Component({
  selector: 'app-deck-summary',
  templateUrl: './deck-summary.page.html',
  styleUrls: ['./deck-summary.page.scss'],
})
export class DeckSummaryPage implements OnInit {
  
  deck$: Observable<Deck>
  cards$: Observable<Card[]>
  constructor(private route: ActivatedRoute, private cardService: CardService, private deckService: DeckService) { }

  ngOnInit(): void {
    const deckId = this.route.snapshot.paramMap.get('deckId');
    this.deck$ = this.deckService.deckById$(deckId);
    this.cards$ = this.cardService.getCardsInDeck(deckId);
  }
}

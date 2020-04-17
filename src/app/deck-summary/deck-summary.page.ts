import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DeckService } from '../deck/deck.service';
import { Deck } from '../deck/deck.model';
import { Observable } from 'rxjs';
import { Card } from '../card/card.model';
import { CardService } from '../card/card.service';
import { CardReviewService } from '../card-review/card-review.service';

@Component({
  selector: 'app-deck-summary',
  templateUrl: './deck-summary.page.html',
  styleUrls: ['./deck-summary.page.scss'],
})
export class DeckSummaryPage implements OnInit {
  
  private deckId: string;
  deck$: Observable<Deck>
  cards$: Observable<Card[]>
  constructor(private route: ActivatedRoute, private router: Router, private cardService: CardService, private deckService: DeckService) { }

  ngOnInit(): void {
    this.deckId = this.route.snapshot.paramMap.get('deckId');
    this.deck$ = this.deckService.deckById$(this.deckId);
    this.cards$ = this.cardService.getCardsInDeck(this.deckId);
    this.cardService.refreshCards();
  }

  beginReview(): void {
    this.router.navigateByUrl(this.router.url+'/card-review');
  }
}

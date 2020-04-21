import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DeckService } from '../deck/deck.service';
import { Deck } from '../deck/deck.model';
import { Observable } from 'rxjs';
import { Card, CardDoc } from '../card/card.model';
import { CardService } from '../card/card.service';
import { CardReviewService } from '../card-review/card-review.service';
import { Unsubscribe } from '../unsubscribe';
import { takeUntil, take } from 'rxjs/operators';

@Component({
  selector: 'app-deck-summary',
  templateUrl: './deck-summary.page.html',
  styleUrls: ['./deck-summary.page.scss'],
})
export class DeckSummaryPage extends Unsubscribe implements OnInit {
  
  private deckId: string;
  cardsView = false;
  deck$: Observable<Deck>
  decks$: Observable<Deck[]>
  cards$: Observable<CardDoc[]>;

  constructor(private cardReviewService: CardReviewService, private route: ActivatedRoute, private router: Router, private cardService: CardService, private deckService: DeckService) { 
    super();
  }

  ngOnInit(): void {
    this.deckId = this.route.snapshot.paramMap.get('deckId');
    this.deckService.selectedDeckIds.add(this.deckId);
    this.deck$ = this.deckService.getDeck(this.deckId);
    this.decks$ = this.deckService.getDecksByParentDeckId(this.deckId);
    this.cards$ = this.cardService.getCardsInDeck(this.deckId);
  }

  beginReview(): void {
    this.cards$.pipe(takeUntil(this.unsubscribe)).subscribe(
      cards => {
        this.cardReviewService.loadCardsForReview(this.deckId).pipe(take(1)).subscribe(
        a => this.router.navigateByUrl(this.router.url+'/card-review/'+cards[0].id)
        );
      }
    )
  }

  segmentChanged(event: CustomEvent) {
    this.cardsView = event.detail.value === 'cards';
  }
}

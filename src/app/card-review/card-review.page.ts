import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CardReviewService } from './card-review.service';
import { Card } from '../card/card.model';
import { Observable } from 'rxjs';
import { DeckService } from '../deck/deck.service';
import { map } from 'rxjs/operators';
import { ReviewDifficulty } from './card-review.model';
import { Unsubscribe } from '../unsubscribe';

@Component({
  selector: 'app-card-review',
  templateUrl: './card-review.page.html',
  styleUrls: ['./card-review.page.scss'],
})
export class CardReviewPage extends Unsubscribe implements OnInit {

  public card$: Observable<Card>;
  public deckName$: Observable<string>;
  public flipped = false;
  constructor(private route: ActivatedRoute, private cardReviewService: CardReviewService, private deckService: DeckService) {
    super();
  }

  ngOnInit(): void { 
    const deckId = this.route.snapshot.paramMap.get('deckId');
    this.deckName$ = this.deckService.getDeck(deckId).pipe(map(deck => deck.name));
    this.card$ = this.cardReviewService.cardUnderReview$;
    this.cardReviewService.loadCardsForReview(deckId).subscribe(
      cards => this.cardReviewService.getNextCard()
    );
    this.setupNextCard();
  }

  setupNextCard() {
    this.card$.subscribe(() => this.flipped = false)
  }

  reviewed(level: ReviewDifficulty): void {
    this.cardReviewService.reviewed(level);
  }
}

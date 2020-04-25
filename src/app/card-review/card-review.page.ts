import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardReviewService } from './card-review.service';
import { Card } from '../card/card.model';
import { Observable, of } from 'rxjs';
import { DeckService } from '../deck/deck.service';
import { map } from 'rxjs/operators';
import { ReviewDifficulty } from './card-review.model';
import { Unsubscribe } from '../unsubscribe';
import { CardService } from '../card/card.service';
import { Doc } from '../base-firestore';

@Component({
  selector: 'app-card-review',
  templateUrl: './card-review.page.html',
  styleUrls: ['./card-review.page.scss'],
})
export class CardReviewPage extends Unsubscribe implements OnInit {

  public card$: Observable<Card>;
  public deckName$: Observable<string>;
  public flipped = false;
  constructor(private route: ActivatedRoute, private cardService: CardService, private cardReviewService: CardReviewService, private deckService: DeckService) {
    super();
  }

  ngOnInit(): void { 
    const deckId = this.route.snapshot.paramMap.get('deckId');
    const cardId = this.route.snapshot.paramMap.get('cardId');

    this.deckName$ = this.deckService.getDeck(deckId).pipe(map(deck => deck.name));
    this.card$ = of(this.cardReviewService.getCardForReview());
  }

  reviewed(card: Doc<Card>, level: ReviewDifficulty): void {
    this.cardReviewService.reviewed(card, level);
  }
}

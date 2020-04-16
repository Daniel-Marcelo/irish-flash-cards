import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardReviewService } from './card-review.service';
import { Card } from '../card/card.model';
import { Observable } from 'rxjs';
import { DeckService } from '../deck/deck.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-card-review',
  templateUrl: './card-review.page.html',
  styleUrls: ['./card-review.page.scss'],
})
export class CardReviewPage implements OnInit {

  public card$: Observable<Card>;
  public deckName$: Observable<string>;
  public flipped = false;
  private cardNo: string;
  constructor(private route: ActivatedRoute, private cardReviewService: CardReviewService, private deckService: DeckService) { }

  ngOnInit() { 
    this.cardNo = this.route.snapshot.paramMap.get('cardId');
    const deckId = this.route.snapshot.paramMap.get('deckId')
    this.card$ = this.cardReviewService.getCardToReview(this.cardNo);
    this.deckName$ = this.deckService.deckById$(deckId).pipe(map(deck => deck.name));
  }
}

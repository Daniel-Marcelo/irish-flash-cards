import { Component, OnInit } from '@angular/core';
import { DeckService } from 'src/app/deck/deck.service';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-deck-name-title',
  templateUrl: './deck-name-title.component.html',
  styleUrls: ['./deck-name-title.component.scss'],
})
export class DeckNameTitleComponent implements OnInit {
  public deckName$: Observable<string>;

  constructor(private route: ActivatedRoute, private deckService: DeckService) { }

  ngOnInit() {
    const deckId = this.route.snapshot.paramMap.get('deckId');
    this.deckName$ = this.deckService.getDeck(deckId).pipe(map(deck => deck.name));
  }

}

import { Component, OnInit } from '@angular/core';
import { DeckService } from '../deck/deck.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-deck',
  templateUrl: './create-deck.page.html',
  styleUrls: ['./create-deck.page.scss'],
})
export class CreateDeckPage implements OnInit {

  deckName: string;

  constructor(private deckService: DeckService, private router: Router) { }

  ngOnInit() {
    
  }

  onSubmit() {
    this.deckService.createDeck(this.deckName);
    this.router.navigateByUrl('/decks');
  }

}

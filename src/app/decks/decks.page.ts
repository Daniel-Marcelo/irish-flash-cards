import { Component, OnInit } from '@angular/core';
import { Deck } from '../deck/deck.model';
import { Observable } from 'rxjs';
import { DeckService } from '../deck/deck.service';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { DeleteCardVerificationComponent } from '../delete-card-verification/delete-card-verification.component';

@Component({
  selector: 'app-decks',
  templateUrl: './decks.page.html',
  styleUrls: ['./decks.page.scss'],
})
export class DecksPage implements OnInit {

  decks$: Observable<Deck[]>;

  constructor(public popoverController: PopoverController, private router: Router, private deckService: DeckService) { }

  ngOnInit() {
    this.decks$ = this.deckService.decks$;
  }

  async delete(id: string) {
    const popover = await this.popoverController.create({
      component: DeleteCardVerificationComponent,
      componentProps: { id },
      translucent: true,
    });
    return await popover.present();
  }

}

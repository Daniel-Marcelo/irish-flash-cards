import { Component, OnInit } from '@angular/core';
import { DeckService } from '../deck/deck.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-create-deck',
  templateUrl: './create-deck.page.html',
  styleUrls: ['./create-deck.page.scss'],
})
export class CreateDeckPage {

  deckName: string;

  constructor(private deckService: DeckService, private router: Router, private loadingController: LoadingController) { }

  async onSubmit() {

    const loading = await this.loadingController.create({
      message: 'Creating deck',
    });
    await loading.present();

    this.deckService.createDeck(this.deckName).then(
      doc => {
        this.loadingController.dismiss();
        this.router.navigateByUrl('/decks');
      }
    );
  }

}

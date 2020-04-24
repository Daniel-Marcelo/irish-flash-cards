import { Component, OnInit } from '@angular/core';
import { Deck, newDeck } from 'src/app/deck/deck.model';
import { DeckService } from 'src/app/deck/deck.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-edit-deck',
  templateUrl: './edit-deck.page.html',
  styleUrls: ['./edit-deck.page.scss'],
})
export class EditDeckPage implements OnInit {

  deck = newDeck();
  private deckId: string;

  constructor(private deckService: DeckService, private router: Router, private route: ActivatedRoute, private loadingController: LoadingController) { }

  ngOnInit(): void {
    this.deckId = this.route.snapshot.paramMap.get('deckId');
      this.deckService.getDeck(this.deckId).pipe(take(1)).subscribe(
        deck => this.deck = deck
      );
  }

  async onSubmit() {

    const loading = await this.loadingController.create({ message: 'Updating deck' });
    await loading.present();

    this.deckService.updateDeck(this.deck.name, this.deckId).then(doc => {
      this.loadingController.dismiss();
      this.router.navigateByUrl('/decks');
    });
  }
}

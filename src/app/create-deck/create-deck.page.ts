import { Component, OnInit } from '@angular/core';
import { DeckService } from '../deck/deck.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { newDeck } from '../deck/deck.model';

@Component({
  selector: 'app-create-deck',
  templateUrl: './create-deck.page.html',
  styleUrls: ['./create-deck.page.scss'],
})
export class CreateDeckPage implements OnInit {

  deck = newDeck();
  immediateParentDeckId: string;

  constructor(private deckService: DeckService, private router: Router, private route: ActivatedRoute, private loadingController: LoadingController) { }

  ngOnInit(): void {
    this.immediateParentDeckId = this.route.snapshot.paramMap.get('parentDeckId');
  }

  async onSubmit() {

    const loading = await this.loadingController.create({ message: 'Creating deck' });
    await loading.present();
    const docId = await this.deckService.createDeck(this.deck, this.immediateParentDeckId)
    this.loadingController.dismiss();
    this.router.navigateByUrl('/decks/' + docId);
  }
}


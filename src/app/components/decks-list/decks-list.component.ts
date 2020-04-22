import { Component, OnInit, Input } from '@angular/core';
import { Deck } from 'src/app/deck/deck.model';
import { DeleteCardVerificationComponent } from 'src/app/delete-card-verification/delete-card-verification.component';
import { Doc } from 'src/app/base-firestore';
import { PopoverController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'decks-list',
  templateUrl: './decks-list.component.html',
  styleUrls: ['./decks-list.component.scss'],
})
export class DecksListComponent implements OnInit {

  @Input()
  decks: Deck[];

  @Input()
  filterText = '';

  constructor(public popoverController: PopoverController, private router: Router) { }

  ngOnInit() {}

  async delete(id: string) {
    event.stopPropagation();
    event.preventDefault();
    const popover = await this.popoverController.create({
      component: DeleteCardVerificationComponent,
      componentProps: { id },
      translucent: true,
    });
    return await popover.present(); 
  }

  editDeck(deck: Doc<Deck>, event: Event) {
    event.stopPropagation();
    event.preventDefault();
    this.router.navigate(['/edit-deck/'+deck.id]);
  }

  isVisible(deckName: string) {
    return deckName.toLowerCase().includes((this.filterText || '').toLowerCase());
  }
}

import { Component } from '@angular/core';
import { PopoverController, NavParams, LoadingController } from '@ionic/angular';
import { DeckService } from '../deck/deck.service';

@Component({
  selector: 'app-delete-card-verification',
  templateUrl: './delete-card-verification.component.html',
  styleUrls: ['./delete-card-verification.component.scss'],
})
export class DeleteCardVerificationComponent {

  constructor(private loadingController: LoadingController, private deckService: DeckService, private navParams: NavParams, private popoverController: PopoverController) { }

  async delete() {
    await this.close();
    const loading = await this.loadingController.create({
      message: 'Deleting',
    });
    await loading.present();
    this.deckService.deleteDeck(this.navParams.data.id).then(
      () => loading.dismiss()
    );
  }

  async close() {
    await this.popoverController.dismiss();
  }

}

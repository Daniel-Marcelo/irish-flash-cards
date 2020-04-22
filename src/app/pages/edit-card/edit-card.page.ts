import { Component, OnInit } from '@angular/core';
import { MediaCapture, MediaFile, CaptureError } from '@ionic-native/media-capture/ngx';
import { DeckService } from 'src/app/deck/deck.service';
import { CardService } from 'src/app/card/card.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Card } from 'src/app/card/card.model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-card',
  templateUrl: './edit-card.page.html',
  styleUrls: ['./edit-card.page.scss'],
})
export class EditCardPage implements OnInit {

  card = {} as Card;
  cardId: string;

  constructor(private mediaCapture: MediaCapture, private location: Location, private deckService: DeckService, private cardService: CardService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.cardId = this.route.snapshot.paramMap.get('cardId');
    this.cardService.get(this.cardId).subscribe(
      card => this.card = card
    );
  }

  onSubmit() {
      this.cardService.update(this.card, this.cardId).then(
        doc => this.location.back()
      )
  }
  
  pickImage() {
    alert('image!');
  }

  recordAudio() {
    this.mediaCapture.captureAudio().then(
      (data: MediaFile[]) => {
        alert('data '+ JSON.stringify(data))
      },
      (err: CaptureError) => alert(JSON.stringify(err))
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { MediaCapture, MediaFile, CaptureError } from '@ionic-native/media-capture/ngx';
import { CardService } from '../card/card.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DeckService } from '../deck/deck.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-create-card',
  templateUrl: './create-card.page.html',
  styleUrls: ['./create-card.page.scss'],
})
export class CreateCardPage implements OnInit {

  question: string;
  answer: string;
  deckId: string;

  constructor(private location: Location, private mediaCapture: MediaCapture, private deckService: DeckService, private cardService: CardService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.deckId = this.route.snapshot.paramMap.get('deckId');
  }

  onSubmit() {
      this.cardService.create({ deckIds: Array.from(this.deckService.selectedDeckIds), question: this.question, answer: this.answer}).then(
        cards => this.location.back()
      );
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

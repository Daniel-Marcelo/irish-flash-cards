import { Component, OnInit } from '@angular/core';
import { MediaCapture, MediaFile, CaptureError, CaptureImageOptions } from '@ionic-native/media-capture/ngx';
import { CardService } from '../card/card.service';
import { Card } from '../card/card.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-card',
  templateUrl: './create-card.page.html',
  styleUrls: ['./create-card.page.scss'],
})
export class CreateCardPage implements OnInit {

  question: string;
  answer: string;
  deckId: string;

  constructor(private mediaCapture: MediaCapture, private cardService: CardService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.deckId = this.route.snapshot.paramMap.get('deckId');
  }

  onSubmit() {
    alert('submitting!');
    this.cardService.createCardInDeck(new Card(this.deckId, this.question, this.answer)).subscribe(
      cards => this.router.navigateByUrl('/decks/'+this.deckId)
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

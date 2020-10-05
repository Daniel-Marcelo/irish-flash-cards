import { Component, NgZone, OnInit } from '@angular/core';
import { MediaCapture, MediaFile, CaptureError } from '@ionic-native/media-capture/ngx';
import { CardService } from '../card/card.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DeckService } from '../deck/deck.service';
import { Location } from '@angular/common';
import { DeckContextService } from '../services/deck-context.service';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { ImageUploadService } from '../services/image-upload.service';

@Component({
  selector: 'app-create-card',
  templateUrl: './create-card.page.html',
  styleUrls: ['./create-card.page.scss'],
})
export class CreateCardPage implements OnInit {

  question: string;
  answer: string;
  deckId: string;

  constructor(private ngZone: NgZone, private imageUpload: ImageUploadService, private imagePicker: ImagePicker, private location: Location, private mediaCapture: MediaCapture, private deckService: DeckService, private cardService: CardService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.deckId = this.route.snapshot.paramMap.get('deckId');
  }

  async onSubmit() {
    this.deckService.getDeck(this.deckId).subscribe(
      deck => {
        const parentDeckIds = [...deck.parentDeckIds, this.deckId];
        this.cardService.create({ immediateParentDeckId: this.deckId, question: this.question, answer: this.answer, deckIds: parentDeckIds }).then(
          card => {
            this.location.back();
          }
        )
      }
    );
  }

  async pickImage() {

    // this.mediaCapture.captureImage().then(
    // const data = await this.imagePicker.getPictures({ maximumImagesCount: 1 });
    // // this.imagePicker.getPictures({maximumImagesCount: 1}).then(
    // // (data: MediaFile[]) => {
    // alert('data ' + JSON.stringify(data))
    // const fullPath = data[0] as any;
    // this.ngZone.run(() =>
     const data =  await this.imagePicker.getPictures({ maximumImagesCount: 1, outputType: 0 })
      // .then(
        // (data: string) => {
          alert(data)
          
          await this.imageUpload.uploadImage3(data[0])
          // .then(a => null);
        // },
        // (err: CaptureError) => alert('Error' + err))
    // );
    // await this.imageUpload.uploadImage(fullPath);
    // },
    // (err: CaptureError) => alert('Error' +err));
    // const options: CameraOptions = {
    //   quality: 50,
    //   destinationType: this.camera.DestinationType.DATA_URL,
    //   encodingType: this.camera.EncodingType.JPEG,
    //   mediaType: this.camera.MediaType.PICTURE,
    //   correctOrientation: true,
    //   sourceType: 0,
    // }

    // this.camera.getPicture(options).then((imageData) => {
    //   let base64Image = 'data:image/jpeg;base64,' + imageData;
    // }, (err) => {
    //   // Handle error
    // });
  }

  recordAudio() {
    this.mediaCapture.captureAudio().then(
      (data: MediaFile[]) => {
        alert('data ' + JSON.stringify(data))
      },
      (err: CaptureError) => alert(JSON.stringify(err))
    );
  }
}

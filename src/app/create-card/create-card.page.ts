import { Component, OnInit } from '@angular/core';
import { FileChooser } from '@ionic-native/file-chooser/ngx';

@Component({
  selector: 'app-create-card',
  templateUrl: './create-card.page.html',
  styleUrls: ['./create-card.page.scss'],
})
export class CreateCardPage implements OnInit {

  question: string;
  answer: string;

  constructor(private fileChooser: FileChooser) { }

  ngOnInit() {
  }

  pickImage() {
    alert('image!');
  }

  recordAudio() {
    alert('audio');
  }

}

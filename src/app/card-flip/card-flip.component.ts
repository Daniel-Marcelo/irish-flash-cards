import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'card-flip',
  templateUrl: './card-flip.component.html',
  styleUrls: ['./card-flip.component.scss'],
})
export class CardFlipComponent {

  @Input()
  front = '';

  @Input()
  back = '';

  @Input()
  flipped = false;

  @Output()
  flippedChange = new EventEmitter<boolean>();
  
  onClick(): void {
    this.flipped = !this.flipped;
    this.flippedChange.next(this.flipped);
  }
}

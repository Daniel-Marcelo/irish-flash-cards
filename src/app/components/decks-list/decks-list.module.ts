import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecksListComponent } from './decks-list.component';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [DecksListComponent],
  imports: [
    CommonModule,
    RouterModule,
    IonicModule
  ],
  exports: [DecksListComponent]
})
export class DecksListModule { }

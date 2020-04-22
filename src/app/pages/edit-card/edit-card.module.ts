import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditCardPageRoutingModule } from './edit-card-routing.module';

import { EditCardPage } from './edit-card.page';
import { MediaCapture } from '@ionic-native/media-capture/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditCardPageRoutingModule
  ],
  declarations: [EditCardPage],
  providers: [MediaCapture]
})
export class EditCardPageModule {}

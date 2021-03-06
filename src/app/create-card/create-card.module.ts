import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateCardPageRoutingModule } from './create-card-routing.module';

import { CreateCardPage } from './create-card.page';
import { MediaCapture } from '@ionic-native/media-capture/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateCardPageRoutingModule
  ],
  declarations: [CreateCardPage],
  providers: [MediaCapture, ImagePicker]
})
export class CreateCardPageModule {}

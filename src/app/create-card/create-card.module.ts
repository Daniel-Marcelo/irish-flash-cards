import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateCardPageRoutingModule } from './create-card-routing.module';

import { CreateCardPage } from './create-card.page';
import { FileChooser } from '@ionic-native/file-chooser/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateCardPageRoutingModule
  ],
  declarations: [CreateCardPage],
  providers: [FileChooser]
})
export class CreateCardPageModule {}

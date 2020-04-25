import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestoreCollection } from '@angular/fire/firestore/public_api';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {
  private imageCollection: AngularFirestoreCollection<MyData>;
  private images: Observable<MyData[]>;
  
  constructor(private db: AngularFirestore, private storage: AngularFireStorage) {
    this.imageCollection = db.collection<MyData>('freakyImages');
    this.images = this.imageCollection.valueChanges();
   }

  uploadImage() {

  }
}


export interface MyData {
  name: string;
  filepath: string;
  size: number;
}
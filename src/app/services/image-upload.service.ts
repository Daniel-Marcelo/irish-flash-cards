import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestoreCollection } from '@angular/fire/firestore/public_api';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {
  private imageCollection: AngularFirestoreCollection<MyData>;
  private images: Observable<MyData[]>;
  fileSize;

  constructor(private db: AngularFirestore, private storage: AngularFireStorage) {
    this.imageCollection = db.collection<MyData>('freakyImages');
    this.images = this.imageCollection.valueChanges();
  }

  uploadImage(event: FileList) {

    // The File object
    const file = event.item(0)
    alert('validating file + ' + JSON.stringify(file));
    // Validation for Images Only
    if (file.type.split('/')[0] !== 'image') {
      console.error('unsupported file type :( ')
      return;
    }

    // The storage path
    const path = `freakyStorage/${new Date().getTime()}_${file.name}`;

    // Totally optional metadata
    const customMetadata = { app: 'Freaky Image Upload Demo' };

    //File reference
    const fileRef = this.storage.ref(path);

    // The main task
    const task = this.storage.upload(path, file, { customMetadata });

    const snapshot = task.snapshotChanges().pipe(

      finalize(() => {
        // Get uploaded file storage path
        const uploadedFileUrl = fileRef.getDownloadURL();

        uploadedFileUrl.subscribe(resp => {
          this.addImagetoDB({
            name: file.name,
            filepath: resp,
            size: this.fileSize
          });
        }, error => {
          console.error(error);
        })
      }),
      tap(snap => {
        this.fileSize = snap.totalBytes;
      })
    )
  }

  addImagetoDB(image: MyData) {
    //Create an ID for document
    const id = this.db.createId();

    //Set document id with value in database
    this.imageCollection.doc(id).set(image).then(resp => {
      console.log(resp);
    }).catch(error => {
      console.log("error " + error);
    });
  }
}


export interface MyData {
  name: string;
  filepath: string;
  size: number;
}
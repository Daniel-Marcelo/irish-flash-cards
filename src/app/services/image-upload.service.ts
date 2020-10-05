import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { File } from '@ionic-native/File/ngx';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {
  private imageCollection: AngularFirestoreCollection<MyData>;
  private images: Observable<MyData[]>;
  fileSize;

  constructor(private db: AngularFirestore, private storage: AngularFireStorage, private file: File, private toastCtrl: ToastController) {
    this.imageCollection = db.collection<MyData>('freakyImages');
    this.images = this.imageCollection.valueChanges();
  }

  async uploadImage3(fullPath: string) {
    const path = fullPath.substr(0, fullPath.lastIndexOf('/') + 1);
    const fileName = fullPath.substr(fullPath.lastIndexOf('/') + 1, fullPath.length - 1);
    console.log('adjusted path '+ path);
    console.log('adjusted name '+ fileName);

    const type = { type: 'image/jpg' }
    const buffer = await this.file.readAsArrayBuffer(path, fileName);
    const fileBlob = new Blob([buffer], type);
 
    const randomId = Math.random()
      .toString(36)
      .substring(2, 8);
 
    const uploadTask = this.storage.upload(
      `files/${new Date().getTime()}_${randomId}`,
      fileBlob
    );

    uploadTask.then(async res => {
      const toast = await this.toastCtrl.create({
        duration: 3000,
        message: 'File upload finished!'
      });
      toast.present();
    });
  }

  uploadImage2(fullPath: string) {
    console.log('Using full path: '+ fullPath);
    const path = fullPath.substr(0, fullPath.lastIndexOf('/') + 1);
    console.log('adjusted path '+ path);
    const fileName = fullPath.substr(fullPath.lastIndexOf('/') + 1, fullPath.length - 1);
    console.log('fileName '+ fileName);





    // const path = f.nativeURL.substr(0, f.nativeURL.lastIndexOf('/') + 1);
    const type = this.getMimeType(fileName.split('.').pop());
    console.log('type '+ type.type);
    console.log(path);
    console.log(fileName);
    // const buffer = await this.file.readAsArrayBuffer(adjustedPath, fileName);
    this.file.readAsArrayBuffer(path, fileName).then(
      buffer => {
        console.log('After buffer '+ buffer);
        const fileBlob = new Blob([buffer], type);
        console.log('After Blob '+ fileBlob);
    
        console.log('setting upload path : '+`files/${new Date().getTime()}_'today`);
        const uploadTask = this.storage.upload(
          `files/${new Date().getTime()}_'today`,
          fileBlob
        );
    
        uploadTask.then(res => {
          this.toastCtrl.create({
            duration: 3000,
            message: 'File upload finished!'
          }).then(toast => {
            toast.present();
          });
        });
      })
  }

  getMimeType(fileExt) {
    if (fileExt == 'wav') return { type: 'audio/wav' };
    else if (fileExt == 'jpg' || fileExt == 'jpeg') return { type: 'image/jpg' };
    else if (fileExt == 'mp4') return { type: 'video/mp4' };
    else if (fileExt == 'MOV') return { type: 'video/quicktime' };
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
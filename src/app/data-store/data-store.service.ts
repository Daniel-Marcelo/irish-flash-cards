import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataStoreService {

  constructor(private storage: Storage) { 
  }

  set<T>(key: string, value: any):Observable<T> {
    return from(this.storage.set(key, value));
  }

  get<T>(key: string):Observable<T> {
    return from(this.storage.get(key));
  }
}

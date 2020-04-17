import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataStoreService {

  constructor(private storage: Storage) {
  }

  set<T>(key: string, value: any): Observable<T> {
    return from(this.storage.set(key, value));
  }

  get<T>(key: string, defaultValue?: any): Observable<T> {
    if (defaultValue) {
      return from(this.storage.get(key)).pipe(map(value => value || defaultValue))
    }
    return from(this.storage.get(key));
  }
}

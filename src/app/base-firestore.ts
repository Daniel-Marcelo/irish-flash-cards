import { Observable } from 'rxjs';
import { AngularFirestoreCollection, AngularFirestore, DocumentReference } from '@angular/fire/firestore/public_api';
import { map } from 'rxjs/operators';

export type Doc<T> = (T & { id: string });

export abstract class BaseFirestore<T> {

    public all$: Observable<Doc<T>[]>;
    protected collection: AngularFirestoreCollection<T>;

    constructor(protected db: AngularFirestore, collectionName: string) {
        this.collection = this.db.collection<T>(collectionName);

        this.all$ = this.collection.snapshotChanges().pipe(
            map(actions => {
                return actions.map(a => {
                    const data = a.payload.doc.data();
                    const id = a.payload.doc.id;
                    return { id, ...data };
                });
            })
        );
    }

    get(id: string): Observable<T> {
        return this.collection.doc<T>(id).valueChanges();
    }
    
    create(item: T): Promise<DocumentReference> {
        return this.collection.add(item);
    }

    update(item: T, id: string): Promise<void> {
        return this.collection.doc<T>(id).update(item);
    }

    delete(id: string): Promise<void> {
        return this.collection.doc<T>(id).delete();
    }
}
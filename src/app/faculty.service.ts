import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FacultyService {

  constructor(private db: AngularFireDatabase) {}
  getAll() {
    return this.db.list('/faculty',
      ref => ref.orderByChild('name'))
          .snapshotChanges().pipe(map(changes => {
            return changes.map(c => ({ key: c.payload.key, value: c.payload.val()
        }));
      }));
  }
}

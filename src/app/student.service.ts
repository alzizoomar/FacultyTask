import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { StudentsDetails } from './studentInterface';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private db: AngularFireDatabase) { }

  create(student) {
    return this.db.list('/students_info').push(student);
  }

  getAll(): Observable<StudentsDetails> {
    return this.db.list('/students_info')
      .snapshotChanges().pipe(map(products => {
        return products.map(c => ({key: c.payload.key, value: c.payload.val()
      }));
    }))as Observable<StudentsDetails>;

  }

  get(studentId): Observable<StudentsDetails> {
    return this.db.object('/students_info/' + studentId).valueChanges() as Observable<StudentsDetails>;

  }

  update(studentId, student) {
    return this.db.object('/students_info/' + studentId).update(student);
  }

  delete(studentId) {
    return this.db.object('/students_info/' + studentId).remove();
  }
}

import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from "angularfire2/firestore";
import { Task } from '../task';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private tasksCollection: AngularFirestoreCollection<Task>;
  private tasks: Observable<Task[]>;

  constructor(db: AngularFirestore) {
    this.tasksCollection = db.collection<Task>('tasks');

    this.tasks = this.tasksCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
   }

   getTasks() {
     return this.tasks;
   }

   getTask(id) {
    return this.tasksCollection.doc<Task>(id).valueChanges();
   }

   updateTask(task: Task, id: string) {
    return this.tasksCollection.doc(id).update(task);
   }

   addTask(task: Task) {
    return this.tasksCollection.add(task);
   }

   removeTask(id) {
    return this.tasksCollection.doc(id).delete();
   }
}

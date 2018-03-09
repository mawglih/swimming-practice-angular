import { Exercise } from "./exercise.model";
import { Subject } from "rxjs/Subject";
import { Subscription } from "rxjs";
import { Injectable } from "@angular/core";
import { AngularFirestore } from "angularfire2/firestore";
import { map } from 'rxjs/operators';
import { UIService } from '../shared/ui.service';

@Injectable()
export class TrainingService {
    private availableExecrcises: Exercise[] = [];
    private runningExercise: Exercise;
    exerciseChange = new Subject<Exercise>();
    availableExerciseChange= new Subject<Exercise[]>();
    private exercises: Exercise[] = [];
    completedExercisesChange = new Subject<Exercise[]>();
    private fbSubs: Subscription[] = [];

    constructor(private db: AngularFirestore, private ui: UIService) {}
    // getAvailableExercises() {
    //     return this.availableExecrcises.slice();
    // }
    fetchAvailableExercises() {
        this.ui.loadingStateChanged.next(true);
        this.fbSubs.push(this.db
        .collection('availableExercises')
        .snapshotChanges()
        .map(arr => {
          return arr.map(doc => {
            return {
              id: doc.payload.doc.id,
              name: doc.payload.doc.data().name,
              duration: doc.payload.doc.data().duration,
              distance: doc.payload.doc.data().distance
            };
          });
        })
        .subscribe((exercises: Exercise[]) => {
            this.ui.loadingStateChanged.next(false);
            this.availableExecrcises = exercises;
            this.availableExerciseChange.next([...this.availableExecrcises]);
        }));
    }

    startExercise(selectedId: string) {
        const selectedExercise = this.availableExecrcises.find(item => item.id === selectedId);
        this.runningExercise = selectedExercise;
        this.exerciseChange.next({...this.runningExercise});
    }

    completeExercise() {
        this.addDataToDatabase({...this.runningExercise, date: new Date(), state: 'completed'});
        this.runningExercise = null;
        this.exerciseChange.next(null);
    }

    cancelExercise(progress: number) {
        this.addDataToDatabase({
            ...this.runningExercise, 
            duration: this.runningExercise.duration * (progress / 100), 
            distance: this.runningExercise.distance * (progress / 100), 
            date: new Date(), 
            state: 'cancelled'
        });
        this.runningExercise = null;
        this.exerciseChange.next(null);
    }


    getRunningExecrcise() {
        return {...this.runningExercise};
    }

    // getCompletedOrCancelledExercises() {
    //     return this.exercises.slice();
    // }

    getCompletedOrCancelledExercisesFromDb() {
        this.fbSubs.push(this.db
         .collection('finishedExercises')
         .snapshotChanges()
         .map(arr => {
             return arr.map(doc => {
                 return {
                     id: doc.payload.doc.data().id,
                     name: doc.payload.doc.data().name,
                     distance: doc.payload.doc.data().distance,
                     duration: doc.payload.doc.data().duration,
                     date: doc.payload.doc.data().date,
                     state: doc.payload.doc.data().state
                 }
             });
         })
         .subscribe((exercises: Exercise[]) => {
            this.exercises = exercises;
            this.completedExercisesChange.next(this.exercises);
         }));
    }

    cancelSubscriptions() {
        this.fbSubs.forEach(sub => sub.unsubscribe());
    }
    
    private addDataToDatabase(exercise: Exercise) {
        this.db.collection('finishedExercises').add(exercise);

    }
}
import { Component, OnInit, OnDestroy } from '@angular/core';
// import { AngularFirestore } from 'angularfire2/firestore';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { UIService } from '../../shared/ui.service';
// import { map } from 'rxjs/operators';


@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  private exerciseSubscription = new Subscription;
  swims: Exercise[];
  isLoading = false;
  private loadingSubs = new Subscription;

  constructor(private trainingService: TrainingService, private ui: UIService) { }

  ngOnInit() {
    this.loadingSubs = this.ui.loadingStateChanged.subscribe(isLoading => {
      this.isLoading = isLoading;
    });
    this.exerciseSubscription = this.trainingService.availableExerciseChange.subscribe(exercises => (this.swims = exercises));
    this.trainingService.fetchAvailableExercises();
    // this.swims = this.trainingService.getAvailableExercises();
    // this.swims = this.db
    //   .collection('availableExercises')
    //   .snapshotChanges()
    //   .map(arr => {
    //     return arr.map(doc => {
    //       return {
    //         id: doc.payload.doc.id,
    //         name: doc.payload.doc.data().name,
    //         duration: doc.payload.doc.data().duration,
    //         distance: doc.payload.doc.data().distance
    //       };
    //     });
    //   });
    // valueChanges();
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }

  ngOnDestroy() {
    this.exerciseSubscription.unsubscribe();
    this.loadingSubs.unsubscribe();
  }
}

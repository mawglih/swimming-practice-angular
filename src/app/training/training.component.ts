import { Component, OnInit, OnDestroy } from '@angular/core';
import { TrainingService } from './training.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit,OnDestroy {
  exerciseSubscription: Subscription;
  ongoingTraining = false;
  constructor(private trainingService: TrainingService) { }

  ngOnInit() {
    this.exerciseSubscription = this.trainingService.exerciseChange.subscribe(item => {
      if(item) {
        this.ongoingTraining = true;
      } else {
        this.ongoingTraining = false;
      }
    });
  }
  ngOnDestroy() {
    if(this.exerciseSubscription) {
      this.exerciseSubscription.unsubscribe();
    }
  }
}

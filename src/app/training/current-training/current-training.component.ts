import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { StopTrainingComponent } from './stop-training/stop-training.component';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {
  progress = 0;
  myTimer;
  constructor(private dialog: MatDialog, private trainingService: TrainingService) { }

  ngOnInit() {
   this.startOrResumeTimer();
  
  } 
  startOrResumeTimer() {
    const step = this.trainingService.getRunningExecrcise().duration / 100 * 1000;
    this.myTimer = setInterval(() => {
      this.progress = this.progress + 1;
      if(this.progress >= 100) {
        this.trainingService.completeExercise();
        clearInterval(this.myTimer);
      }
    }, step);
  }
  onStop() {
    clearInterval(this.myTimer);
    const dailogRef = this.dialog.open(StopTrainingComponent, {data: {progress: this.progress}});
    dailogRef.afterClosed().subscribe(result => {
      if(result) {
        this.trainingService.cancelExercise(this.progress);
      } else {
        this.startOrResumeTimer();
      }
    });
  }
}

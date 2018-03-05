import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';
import { StopTrainingComponent } from './stop-training/stop-training.component';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {
  progress = 0;
  myTimer;
  @Output() trainingExit = new EventEmitter();
  constructor(private dialog: MatDialog) { }

  ngOnInit() {
   this.startOrResumeTimer();
  
  } 
  startOrResumeTimer() {
    this.myTimer = setInterval(() => {
      this.progress = this.progress + 5;
      if(this.progress >= 100) {
        clearInterval(this.myTimer);
      }
    }, 1000);
  }
  onStop() {
    clearInterval(this.myTimer);
    const dailogRef = this.dialog.open(StopTrainingComponent, {data: {progress: this.progress}});
    dailogRef.afterClosed().subscribe(result => {
      if(result) {
        this.trainingExit.emit();
      } else {
        this.startOrResumeTimer();
      }
    });
  }
}

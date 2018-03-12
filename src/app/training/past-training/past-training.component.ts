import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.sass']
})
export class PastTrainingComponent implements OnInit, AfterViewInit {

  displayedColumns = ['date', 'name', 'distance', 'duration', 'state', ];
  dataSource = new MatTableDataSource<Exercise>();
  exerciseSubscription = new Subscription;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private trainingService: TrainingService) { }

  ngOnInit() {
    this.exerciseSubscription = this.trainingService.completedExercisesChange.subscribe(exercises => (this.dataSource.data = exercises));
    this.trainingService.getCompletedOrCancelledExercisesFromDb();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  ngOnDestroy() {
    if( this.exerciseSubscription) {
      this.exerciseSubscription.unsubscribe();
    }
  }
}

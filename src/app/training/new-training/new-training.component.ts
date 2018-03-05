import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  @Output() trainingStart = new EventEmitter<void>();
  swims = [
    {value: 'freestyle', viewValue: 'Freestyle'},
    {value: 'breaststroke', viewValue: 'Breaststroke'},
    {value: 'backstroke', viewValue: 'Backstroke'},
    {value: 'butterfly', viewValue: 'Butterfly'}
  ];
  constructor() { }

  ngOnInit() {
  }

  onStartTraining() {
    this.trainingStart.emit();
  }
}

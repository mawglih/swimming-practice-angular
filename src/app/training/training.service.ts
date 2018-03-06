import { Exercise } from "./exercise.model";
import { Subject } from "rxjs/Subject";

export class TrainingService {
    private availableExecrcises: Exercise[] = [
        { id: 'breaststroke', name: 'Breast Stroke', duration: 15, distance: 500},
        { id: 'backstroke', name: 'Back Stroke', duration: 10, distance: 300},
        { id: 'butterfly', name: 'Butterfly', duration: 10, distance: 300},
        { id: 'freestyle', name: 'Free Style', duration: 30, distance: 1000}
    ];
    private runningExercise: Exercise;
    exerciseChange = new Subject<Exercise>();
    private exercises: Exercise [] = [];

    getAvailableExercises() {
        return this.availableExecrcises.slice();
    }

    startExercise(selectedId: string) {
        const selectedExercise = this.availableExecrcises.find(item => item.id === selectedId);
        this.runningExercise = selectedExercise;
        this.exerciseChange.next({...this.runningExercise});
    }

    completeExercise() {
        this.exercises.push({...this.runningExercise, date: new Date(), state: 'completed'});
        this.runningExercise = null;
        this.exerciseChange.next(null);
    }

    cancelExercise(progress: number) {
        this.exercises.push({
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

    getCompletedOrCancelledExercises() {
        return this.exercises.slice();
    }
    
}
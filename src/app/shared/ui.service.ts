import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class UIService {
    constructor(private snackbar: MatSnackBar) {}
    loadingStateChanged = new Subject<boolean>();

    openSnackBar(message, action, duration) {
        this.snackbar.open(message, action, {
            duration: duration
        });
    }
}
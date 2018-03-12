import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { TrainingService } from '../training/training.service';
import { MatSnackBar } from '@angular/material';
import { UIService } from '../shared/ui.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../app.reducer';

@Injectable()
export class AuthService {
    authChange = new Subject<boolean>();
    // private user: User;
    private isAuthenticated = false;

    constructor(
        private router: Router, 
        private afa: AngularFireAuth, 
        private trainingService: TrainingService, 
        private snackbar: MatSnackBar,
        private uis: UIService,
        private store: Store<{ui: fromApp.State}>
        ) {}

    initAuthListener() {
        this.afa.authState.subscribe(user => {
            if(user) {
                this.isAuthenticated = true;
                this.authChange.next(true);
                this.router.navigate(['/training']);
            } else {
                this.trainingService.cancelSubscriptions();
                this.authChange.next(false);
                this.router.navigate(['/login']);
                this.isAuthenticated = false;
            }
        });
    }

    registerUser(authData: AuthData) {
        // this.uis.loadingStateChanged.next(true);
        this.store.dispatch({type: 'START_LOADING'});
        this.afa.auth.createUserWithEmailAndPassword(authData.email, authData.password)
            .then(result => {
                // this.uis.loadingStateChanged.next(false);
                this.store.dispatch({type: 'STOP_LOADING'});
            })
            .catch(error => {
                // this.uis.loadingStateChanged.next(false);
                this.store.dispatch({type: 'STOP_LOADING'});
                this.uis.openSnackBar(error.message, null, 3000);
                // this.snackbar.open(error.message, null,  {
                //     duration: 3000
                // });
            });
        // this.user = {
        //     email: authData.email,
        //     userId: Math.round(Math.random() * 10000).toString()
        // };
        

    }
    login(authData: AuthData) {
        // this.uis.loadingStateChanged.next(true);
        this.store.dispatch({type: 'START_LOADING'});
        this.afa.auth.signInWithEmailAndPassword(authData.email, authData.password)
            .then(result => {
                // this.uis.loadingStateChanged.next(false);
                this.store.dispatch({type: 'STOP_LOADING'});
            })
            .catch(error => {
                // this.uis.loadingStateChanged.next(false);
                this.store.dispatch({type: 'STOP_LOADING'});
                this.uis.openSnackBar(error.message, null, 3000);
                // this.snackbar.open(error.message, null, {
                //     duration: 3000
                // });
            });
        // this.user = {
        //     email: authData.email,
        //     userId: Math.round(Math.random() * 10000).toString()
        // };
        
    }
    logout() {
        this.afa.auth.signOut();
        
    }

    isAuth() {
        return this.isAuthenticated;
    }

}

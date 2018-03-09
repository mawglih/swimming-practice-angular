import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { TrainingService } from '../training/training.service';
import { MatSnackBar } from '@angular/material';
import { UIService } from '../shared/ui.service';

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
        private ui: UIService
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
        this.ui.loadingStateChanged.next(true);
        this.afa.auth.createUserWithEmailAndPassword(authData.email, authData.password)
            .then(result => {
                this.ui.loadingStateChanged.next(false);
            })
            .catch(error => {
                this.ui.loadingStateChanged.next(false);
                this.ui.openSnackBar(error.message, null, 3000);
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
        this.ui.loadingStateChanged.next(true);
        this.afa.auth.signInWithEmailAndPassword(authData.email, authData.password)
            .then(result => {
                this.ui.loadingStateChanged.next(false);
            })
            .catch(error => {
                this.ui.loadingStateChanged.next(false);
                this.ui.openSnackBar(error.message, null, 3000);
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

import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Subscription, Observable } from 'rxjs';
import { UIService } from '../../shared/ui.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../../app.reducer';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit{
  isLoading$: Observable<boolean>;
  private loadingSubs = new Subscription;

  constructor(private authService: AuthService, private uis: UIService, private store: Store<{ui: fromApp.State}>) { }

  ngOnInit() {
    this.isLoading$ = this.store.map(state => state.ui.isLoading);
    // this.loadingSubs = this.uis.loadingStateChanged.subscribe(isLoading => {
    //   this.isLoading = isLoading;
    // })
  }
  onSubmit(form: NgForm) {
    
    this.authService.login({
      email: form.value.email,
      password: form.value.password
    });
  }
  // ngOnDestroy() {
  //   if(this.loadingSubs) {
  //     this.loadingSubs.unsubscribe();
  //   } 
  // }
}

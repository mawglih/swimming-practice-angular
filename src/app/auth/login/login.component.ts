import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';
import { UIService } from '../../shared/ui.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit, OnDestroy {
  isLoading = false;
  private loadingSubs = new Subscription;

  constructor(private authService: AuthService, private ui: UIService) { }

  ngOnInit() {
    this.loadingSubs = this.ui.loadingStateChanged.subscribe(isLoading => {
      this.isLoading = isLoading;
    })
  }
  onSubmit(form: NgForm) {
    
    this.authService.login({
      email: form.value.email,
      password: form.value.password
    });
  }
  ngOnDestroy() {
    this.loadingSubs.unsubscribe();
  }
}

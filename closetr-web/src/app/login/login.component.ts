import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../models/user.model';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  enableLogin: boolean;
  showLoginError: boolean;
  authenticationService: AuthenticationService;

  constructor(private router: Router,
              private authenticationservice: AuthenticationService) {
    this.username = "";
    this.password = "";
    this.showLoginError = false;
    this.authenticationService = authenticationservice;

    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/dashboard']);
    }
  }

  ngOnInit() {
  }

  checkEnableLogin(): boolean {
    if (this.username.length == 0 || this.password.length == 0) {
      return false;
    }
    return true;
  }

  loginChangeHandler(): void {
    this.showLoginError = false;
  }

  toSignUp(): void {
    this.router.navigate(['/register']);
  }

  login(): void {
    this.showLoginError = false;
    var loginData = {
      userID: this.username,
      userPassword: this.password
    };

    this.authenticationService.login(loginData)
      .pipe(first())
      .subscribe(
        data => {
          if (data) {
            this.router.navigate(['/dashboard']);
          } else {
            this.showLoginError = true;
          }
        },
        error => { }
      );

  }

}

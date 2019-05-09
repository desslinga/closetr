import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { AuthenticationService } from '../../../services/authentication.service';
import { User } from '../../../models/user.model';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})

/*
Page containing a login form, for a visitor to log in to the platform. Login
form contains a username and password field, and a 'log in' button. The
'log in' button is enabled only when both username and password fields are
non-empty. When visitor has entered incorrect login credentials, then an
appropriate error message is displayed.

There is a 'sign up' button which links to the Register page, if a visitor
does not have an account yet. When a user has clicked 'log in' with correct
credentials, they are redireted to the Dashboard page.

username: the input value of the username field (entered by user.)

password: the input value of the password field (entered by user.)

enableLogin: boolean to indicate whether or not 'log in' button should be
enabled.

showLoginError: boolean to indicate whether or not error messages should be
displayed on the username/password fields.

show: boolean to indicate whether or not login page should be displayed.
*/
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  enableLogin: boolean = false;
  showLoginError: boolean = false;
  show : boolean = false;

  constructor(private router: Router,
              private authenticationService: AuthenticationService) { }

  /*
  Initial data loading: show login page. Check if there is a current user
  already logged in, and if yes, then navigate to the Dashboard page.
  */
  ngOnInit() {
    this.show = true;
    (this.authenticationService.currentUserValue
      && this.router.navigate(['/dashboard']));
  }

  /*
  Called whenever the username or password fields change with user input. Any
  error messages displayed are cleared. The enableLogin variable is updated,
  and set to true if both the username and password fields are non-empty
  (false otherwise).
  */
  loginChangeHandler = (): void => {
    this.showLoginError = false;
    this.enableLogin = !(this.username.length == 0 || this.password.length == 0);
  }

  /*
  Called when user clicks the 'sign up' button. Navigates to the Register page.
  */
  toSignUp = (): Promise<boolean> => this.router.navigate(['/register']);

  /*
  Called when user clicks the 'log in' button. Wraps username and password
  field input into a param object, and calls authentication service's login
  method to validate the login data. The validation result is checked after
  it is returned. If the login data is valid, then the user is redirected to
  the dashboard. Otherwise, appropriate errors are shown on the fields.
  */
  login(): void {
    this.showLoginError = false;
    const loginData = { userID: this.username, userPassword: this.password };
    this.authenticationService.login(loginData)
      .subscribe(data => {
        if (data) {
          this.router.navigate(['/dashboard']);
        } else {
          this.showLoginError = true;
        }
     });
  }

}

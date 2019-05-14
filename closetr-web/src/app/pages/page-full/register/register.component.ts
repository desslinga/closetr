import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user.model';
import { AuthenticationService } from '../../../services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
/*
Page containing the sign up screen, where the user can create a new account.
Contains a form with name, username, password, and confirm password fields.
Form has UI validation, with error messages displayed under each field that
requires user attention. If user doesn't have an account yet, they may fill out
the form with credentials they wish to sign up with. Upon clicking 'sign up',
the data entered will be validated. The username requested by the visitor is
checked (if such a username already exists, then an erorr is displayed.) After
a new account has been created, the page redirects back to the Login page.

The Register page can only be accessed if there is no user logged in. There is
also a link to the Login page (the 'log in' button.)

fields: object containing each field value in the register form (name, username,
password, and passwordConfirm.)

errors: object containing each error message for each field in the register
form (name, username, password, and passwordConfirm.)

userExists: boolean indicating whether or not the username that is requested
already exists.

show: boolean to indicate if register page should be displayed (false if
there is a user logged in.)
*/
export class RegisterComponent implements OnInit {
  fields: any = {
    name: '',
    username: '',
    password: '',
    passwordConfirm: ''
  };
  errors: any = {
    name: '',
    username: '',
    password: '',
    passwordConfirm: ''
  };
  userExists: boolean = false;
  show: boolean = false;
  enableRegister: boolean = false;

  constructor(private router: Router,
              private userService: UserService,
              private authenticationService: AuthenticationService) { }

  /*
  Initial data loading: show the page (by toggling show variable.) Checks if
  there is a user already logged in -- if so, then navigate to the dashboard.
  */
  ngOnInit() {
    this.show = true;
    (this.authenticationService.currentUserValue
      && this.router.navigate(['/dashboard']));
  }

  /*
  Called whenever there are changes to any fields on the form. Checks that
  all the fields are filled, and that the password is equal to passwordConfirm.
  If the above criteria is met, then it returns true (false otherwise.)
  */
  checkEnableRegister = (): void => {
    const { name, username, password, passwordConfirm } = this.fields;
    let result = !(name.length == 0
        || username.length == 0
        || password.length == 0
        || passwordConfirm.length == 0
        || (password!= passwordConfirm));
    this.enableRegister = result;
  }

  /*
  Called whenever there are changes to any fields on the form. Resets all
  previously displayed error messages.
  */
  resetErrors(): void {
    this.errors = {
      name: '',
      username: '',
      password: '',
      passwordConfirm: ''
    };
  }

  /*
  Called whenever there are changes to any fields on the form. Checks if there
  should be an error displayed on the confirm password field. An error will
  be displayed if both password and the password confirm fields are filled, but
  they are not the same.
  */
  checkErrorPasswordConfirm(): void {
    const { password, passwordConfirm } = this.fields;
    if (password.length != 0
        && passwordConfirm.length != 0
        && password != passwordConfirm) {
          this.errors.passwordConfirm = 'passwords are not the same.';
     }
  }

  checkErrorPassword(): void {
    const { password, passwordConfirm } = this.fields;
    if (password.length == 0
        && passwordConfirm.length != 0) {
          this.errors.password = 'password is required.'
    }
  }

  checkErrorUsername(): void {
    const { username, password, passwordConfirm } = this.fields;
    if ((password.length != 0
        || passwordConfirm.length != 0)
        && username.length == 0) {
          this.errors.username = 'username is required.'
    }
    if (this.userExists) {
      this.errors.username = 'user with that username already exists.';
    }
  }

  checkErrorName(): void {
    const { username, password, passwordConfirm } = this.fields;
    if ((username.length != 0
         || password.length != 0
         || passwordConfirm.length != 0)
        && (name.length == 0)) {
          this.errors.name = 'name is required.';
    }
  }

  registerChangeHandler = (): void => {
    this.userExists = false;
    this.resetErrors();
    this.checkErrorPasswordConfirm();
    this.checkErrorPassword();
    this.checkErrorUsername();
    this.checkErrorName();
    this.checkEnableRegister();
  }

  toSignIn(): void {
    this.router.navigate(['/login']);
  }

  register = (): void => {
    this.userExists = false;
    const { name, username, password } = this.fields;
    var params = {
      userName: name,
      userID: username,
      userPassword: password
    }
    this.userService.register(new User(params)).subscribe(
      (data: any) => {
        if (data.auth) {
          this.router.navigate(['/dashboard']);
        } else {
          this.userExists = true;
          this.checkError();
        }
      }, error => {}
    );
  }

}

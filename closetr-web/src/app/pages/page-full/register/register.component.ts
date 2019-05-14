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

fields: object containing each field in the register form (name, username,
password, and passwordConfirm.)
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
  enableLogin: boolean = false;
  userExists: boolean = false;
  show: boolean = false;
  constructor(private router: Router,
              private userService: UserService,
              private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.resetErrors();
    this.show = true;
    (this.authenticationService.currentUserValue
      && this.router.navigate(['/dashboard']));
  }

  checkEnableRegister(): boolean {
    const { name, username, password, passwordConfirm } = this.fields;
    let result = !(name.length == 0
        || username.length == 0
        || password.length == 0
        || passwordConfirm.length == 0
        || (password!= passwordConfirm));
    return result;
  }

  registerChangeHandler(): void {
    this.userExists = false;
    this.checkError();
  }

  resetErrors(): void {
    this.errors = {
      name: '',
      username: '',
      password: '',
      passwordConfirm: ''
    };
  }

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

  checkError(): void {
    this.resetErrors();
    this.checkErrorPasswordConfirm();
    this.checkErrorPassword();
    this.checkErrorUsername();
    this.checkErrorName();
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

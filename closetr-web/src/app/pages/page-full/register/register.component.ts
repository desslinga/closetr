import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user.model';
import { AuthenticationService } from '../../../services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
  name: string = "";
  username: string = "";
  password: string = "";
  passwordConfirm: string ="";
  enableLogin: boolean = false;
  userExists: boolean = false;
  show: boolean = false;
  errorMessage: any = {};
  error: any = { };

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
    let result = !(this.name.length == 0
        || this.username.length == 0
        || this.password.length == 0
        || this.passwordConfirm.length == 0
        || (this.password != this.passwordConfirm));
    return result;
  }

  registerChangeHandler(): void {
    this.userExists = false;
    this.checkError();
  }

  resetErrors(): void {
    this.errorMessage = {
      'name':'',
      'username':'',
      'password':'',
      'passwordConfirm':''
    };
    this.error = {
      'name': false,
      'username': false,
      'password': false,
      'passwordConfirm': false
    };
  }

  checkErrorPasswordConfirm(): void {
    if (this.password.length != 0
        && this.passwordConfirm.length != 0
        && this.password != this.passwordConfirm) {
          this.errorMessage.passwordConfirm = 'passwords are not the same.';
          this.error.passwordConfirm = true;
     }
  }

  checkErrorPassword(): void {
    if (this.password.length == 0
        && this.passwordConfirm.length != 0) {
          this.errorMessage.password = 'password is required.'
          this.error.password = true;
    }
  }

  checkErrorUsername(): void {
    if ((this.password.length != 0
        || this.passwordConfirm.length != 0)
        && this.username.length == 0) {
          this.errorMessage.username = 'username is required.'
          this.error.username = true;
    }
    if (this.userExists) {
      this.errorMessage.username = 'user with that username already exists.';
      this.error.username = true;
    }
  }

  checkErrorName(): void {
    if ((this.username.length != 0
         || this.password.length != 0
         || this.passwordConfirm.length != 0)
        && (this.name.length == 0)) {
          this.errorMessage.name = 'name is required.';
          this.error.name = true;
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
    var params = {
      userName: this.name,
      userID: this.username,
      userPassword: this.password
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

import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication.service';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})

/*
Page for user to edit their profile. Properties that are available for editing
are: name, and description. Username and password (temporarily) cannot be
changed. By default, page is in view mode, where user may only view their
profile. To enable edit mode, the user must click the 'edit' icon. When edit
mode is enabled, the user may then edit the name and description fields. The
changed fields can be saved via clicking the 'save' button.

editMode: boolean to indicate whether or not it is edit mode.

currentUser: the user that is logged in.
*/
export class ProfileComponent implements OnInit {
  editMode: boolean = false;
  currentUser: User = new User();

  constructor(private authenticationService: AuthenticationService,
              private userService: UserService) { }

  /*
  Initial data loading: retrieve the currently logged in user.
  */
  ngOnInit() {
    this.currentUser = this.authenticationService.currentUserValue;
  }

  /*
  Validates form data in the profile. Returns true if form data is valid.
  (Temporarily always returns true.)
  */
  checkSubmit = (): boolean => true;

  /*
  Saves updated user profile by using the userService. When profile has
  successfully updated, then the currentUser variable is refreshed, and
  the currentUser in localStorage is updated to reflect the changes. Finally,
  edit mode is toggled off, and page is in view mode again.
  */
  save(): void {
    this.userService.update(new User(this.currentUser)).subscribe(
      (user: any) => {
        this.currentUser.userName = user.userName;
        this.currentUser.userDesc = user.userDesc;
        localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
        this.toggleEditMode();
      }
    );
  }

  /*
  Toggles edit mode on and off.
  */
  toggleEditMode = (): boolean => this.editMode = !this.editMode;

}

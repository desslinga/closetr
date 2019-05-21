import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
/*
Header component that is displayed on the top of web-application. Contains the
user icon, and the Closetr icon. The header component is hidden when there is
no user logged in -- aka the Login and Register pages. When the user icon is
clicked, the user popup menu appears, where the user can access their profile
and settings, or logout.

currUrl: the current url that contains the page.

isHidden: boolean indicating whether or not the header component should be
hidden.

showMenu: boolean indicating whether or not the user popup menu should be
displayed.
*/
export class HeaderComponent implements OnInit {
  currUrl: string = '';
  isHidden: boolean = true;
  showMenu: boolean = false;

  constructor(private router: Router,
              private location: Location) { }

  /*
  Initial data loading: obtain the current url of the page, and then check if
  the header component should be displayed for that url.
  */
  ngOnInit() {
    this.router.events.subscribe((val) => {
      this.currUrl = this.location.path();
      this.checkHidden();
    });
  }

  /*
  Updates the isHidden boolean to whether the header component should be hidden
  or not. isHidden will be true if the current url points to either of the
  Login, or Register pages.
  */
  checkHidden(): void {
    this.isHidden = false;
    if (this.currUrl == '/login'
        || this.currUrl == '/register'
      ) {
      this.isHidden = true;
    }
  }

  /*
  Toggles the user popup menu to show or hide. 
  */
  toggleMenu = (): boolean => this.showMenu = !this.showMenu;

}

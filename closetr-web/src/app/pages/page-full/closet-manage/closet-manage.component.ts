import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ClosetService } from '../../../services/closet.service';
import { AuthenticationService } from '../../../services/authentication.service';
import { RoutesService } from '../../../services/routes.service';
import { RouterModule, Routes, Router } from '@angular/router';
import { SearchFilterPipe } from '../../../pipes/search-filter.pipe';
import { Clothing } from '../../../models/clothing.model';
import { User } from '../../../models/user.model';
import { ClosetFactory } from '../../../factories/closet.factory';

@Component({
  selector: 'app-closet-manage',
  templateUrl: './closet-manage.component.html'
})

/*
Page for a user to view clothing items in their closet. Clothing items are
displayed in card format; each card having a picture and short description.
There is a search bar for users to filter through their closet, as well as
additional filter/sort options to adjust how clothing is displayed.

Page is defaulted to view mode, where user can look at clothing cards, and
use the search bar to filter. Clicking the 'edit' (pencil) icon enables edit
mode, which enables 'edit' and 'close' functions on each clothing card.
Clicking the 'edit' button on a clothing card will navigate the user to the
Edit Clothing page. Edit mode can be exited via clicking the 'save' button.

User may add a new clothing item by clicking the 'add new' button, where they
will be redirected to the Add Clothing page.

closetList: an array consisting of all the user's clothing.

editMode: boolean to indicate whether or not it is edit mode.

searchText: the input value of the search bar (entered by user.)

currentUser: the user that is logged in.

filterOptions: an array of filter options shown in the filter selector.

sortOptions: an array of sorting options shown in the sort selector.
*/
export class ClosetManageComponent implements OnInit {
  closetList: Array<Clothing>;
  editMode : boolean = false;
  searchText: String;
  currentUser: User;
  filterOptions: Array<string>;
  sortOptions: Array<string>;

  constructor(private closetService: ClosetService,
              private router: Router,
              private routesService: RoutesService,
              private authenticationService: AuthenticationService) { }

  /*
  Initial data loading: retrieve the currently logged in user, and then get
  that user's closet. Then get retrieve the filter and sort options from the
  closet service.
  */
  ngOnInit() {
    this.currentUser = this.authenticationService.currentUserValue;
    ClosetFactory.getAllClothes(this);
    ({
      filterOptions: this.filterOptions,
      sortOptions: this.sortOptions
    } = this.closetService);
  }

  /*
  Triggered by 'add new' button, which navigates to the Add Clothing page. Sets
  previous url, so that destination page can navigate back to Closet Manage
  page.
  */
  navTo = (): void => this.routesService.setPrevUrl(this.router.url);

  /*
  Toggles edit mode on and off.
  */
  toggleEditMode = (): boolean => this.editMode = !this.editMode;

  /*
  Temporary functionality: triggers toggleEditMode.
  */
  save = (): boolean => this.toggleEditMode();

  /*
  Input: clothingID of clothing to be removed.
  Removes clothing from closet list via a DELETE request with the given
  clothingID. After clothing has been deleted, then all clothing items are
  retrieved to refresh the closet list.
  */
  removeClothing = (clothingID: any): Observable<any> =>
    ClosetFactory.removeClothing(this, clothingID);

}

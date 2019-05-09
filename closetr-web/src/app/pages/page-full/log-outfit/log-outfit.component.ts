import { Component, OnInit} from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { LogOutfitService } from '../../../services/log-outfit.service';
import { ClosetService } from '../../../services/closet.service';
import { RoutesService } from '../../../services/routes.service';
import { AuthenticationService } from '../../../services/authentication.service';
import { SearchFilterPipe } from '../../../pipes/search-filter.pipe';
import { Clothing } from '../../../models/clothing.model';
import { User } from '../../../models/user.model';
import { Subscription } from 'rxjs';
import { DateFormatService } from '../../../services/utils/date-format.service';
import { ClosetFactory } from '../../../factories/closet.factory';

@Component({
  selector: 'app-log-outfit',
  templateUrl: './log-outfit.component.html'
})

/*
Page for logging a user's outfit for today. Contains a search bar where users
can search for items in their closet, to add to today's outfit. Outfit clothing
can also be added manually, using the 'add manually' button to be redirected
to the Add Clothing page.

Clothing that have been added for today's outfit are listed in card format
below the search bar. Once clothing have been added to an outfit entry, they
can be removed via clicking the 'edit' (pencil) icon, and then clicking the 'x'
next to the clothing card. To exit edit mode, a user would click the 'save'
button.

outfitClothingList: an object list, where each key-value pair is a Clothing
object for the today's outfit.

closetList: an object list, consisting of all the user's clothing.

editMode: boolean to indicate whether or not it is edit mode.

searchText: the input value of the search bar (inputted by user).

currentUser: the user that is logged in.

params: a parameter object containing user id, and date, to be used for
creating the POST request to save today's outfit entry.
*/
export class LogOutfitComponent implements OnInit {
  outfitClothingList: any;
  closetList: any;
  editMode : boolean = false;
  searchText: String;
  currentUser: User;
  params: any;

  constructor(private router: Router,
              private logOutfitService: LogOutfitService,
              private closetService: ClosetService,
              private authenticationService: AuthenticationService,
              private routesService: RoutesService,
              private dateFormatService: DateFormatService) { }

  /*
  Initial data loading: retrieve the currently logged in user, and then get
  that user's closet. If there is a user logged in, then create the params
  object with that user's id, and today's date. Finally, we retrive all clothing
  that have been entered for today's outfit so far.
  */
  ngOnInit() {
    this.currentUser = this.authenticationService.currentUserValue;
    this.getAllClothes();
    if (this.currentUser) {
      this.params = {
        userID: this.currentUser.id,
        date: this.dateFormatService.formatDateString(new Date())
      };
    }
    this.getAllOutfitClothes(this.params);
  }

  toggleEditMode = (): boolean => this.editMode = !this.editMode;

  save = (): boolean => this.toggleEditMode();

  navTo = (): void => {
    this.routesService.setPrevUrl('/log-outfit');
    this.router.navigate(['/add-clothing']);
  }

  /*
  Checks if the given clothing's ID is contained in the current outfit
  clothing list. Returns true if it is present.
  */
  outfitClothingListContains = (clothing: any): boolean =>
    this.outfitClothingList.some(outfitEntry =>
      outfitEntry.clothingID === clothing.clothingID);

  /*
  Adds clothing selected from search results to the outfit clothing list.
  */
  addSearchResult(clothing: any): void {
    // check if clothing to be added is already in outfit clothing list
    if (!this.outfitClothingListContains(clothing)) {
      const params = {
        clothingID: clothing.clothingID,
        userID: this.currentUser.id,
        date: this.dateFormatService.formatDateString(new Date())
      };
      this.addOutfitClothing(params);
      this.getAllOutfitClothes(this.params);
    }
  }

  removeCard = (outfitEntry: any): Observable<any> =>
    this.deleteOutfitClothing(outfitEntry.outfitEntryID);

  deleteOutfitClothing = (outfitEntryID: any): Observable<any> =>
    this.subscribeAndGetAllOutfitClothes(
      this.logOutfitService.deleteOutfitClothing(outfitEntryID)
    );

  addOutfitClothing = (params: any): Observable<any> =>
    this.subscribeAndGetAllOutfitClothes(
      this.logOutfitService.addOutfitClothing(params)
    );

  getAllOutfitClothes = (params: any): Observable<any> =>
    this.logOutfitService.getAllOutfitClothes(params).subscribe(
      (data: any) => this.outfitClothingList = data
    );

  getAllClothes = (): Observable<any> => ClosetFactory.getAllClothes(this);

  subscribeAndGetAllOutfitClothes = (apiCall: any): Observable<any> =>
    apiCall.subscribe((data: any) => this.getAllOutfitClothes(this.params));

}

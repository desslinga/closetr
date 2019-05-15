import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ClosetService } from '../../../services/closet.service';
import { AuthenticationService } from '../../../services/authentication.service';
import { Clothing } from '../../../models/clothing.model';
import { User } from '../../../models/user.model';
import { ClosetFactory } from '../../../factories/closet.factory';

@Component({
  selector: 'app-closet-widget',
  templateUrl: './closet-widget.component.html'
})
/*
Widget containing snippet information about a user's closet. Displays some of
the user's clothing in a card list format. There are selectors that allow the
user to filter and sort through the clothing that is displayed. There is an
'edit' icon on the top right, which links to the Closet Manage page.

closetList: an array consisting of all the user's clothing.

currentUser: the user that is logged in.

filterOptions: an array of filter options shown in the filter selector.

sortOptions: an array of sorting options shown in the sort selector.
*/
export class ClosetWidgetComponent implements OnInit {
  closetList: Array<Clothing>;
  currentUser: User;
  filterOptions: Array<string>;
  sortOptions: Array<string>;

  constructor(private closetService: ClosetService,
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
}

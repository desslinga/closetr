import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ClosetService } from '../../../services/closet.service';
import { AuthenticationService } from '../../../services/authentication.service';
import { DateFormatService } from '../../../services/utils/date-format.service';
import { Clothing } from '../../../models/clothing.model';
import { User } from '../../../models/user.model';
import { ClosetFactory } from '../../../factories/closet.factory';

@Component({
  selector: 'app-budget-widget',
  templateUrl: './budget-widget.component.html'
})
/*
Widget containing snippet information about a user's budget. It has a table
of purchases (up to four entries displayed), with a date range selector to
toggle which purchases are displayed on the table. There is a 'manage spending'
button which navigates to the Manage Spending page (containing more detailed
information about user's spending).

There is also a progress bar showing current progress of the user's budget
for their current time range (this month, this week, etc.). This will be
displayed underneath the 'manage spending' button. There is also an edit icon
to the right of the progress bar, which redirects to the Budget Manage page.

dateOptions: an array of date range options shown in the date range selector.

closetList: an array consisting of all the user's clothing.

filterCriteria: an object describing what filters are being applied to the
data displayed on the table of purchases.

currentUser: the user that is logged in.
*/
export class BudgetWidgetComponent implements OnInit {
  dateOptions: Array<string> = [
    "last week",
    "last month"
  ];
  closetList: Array<Clothing> = [];
  filterCriteria: any = {};
  currentUser: User;

  constructor(
    private closetService: ClosetService,
    private authenticationService: AuthenticationService,
    private dateFormatService: DateFormatService
  ) { }

  /*
  Initial data loading: initialize the filterCriteria object to restrict the
  purchase table to display purchases from the last month. Retrieve the
  currently logged in user, and then get that user's closet.
  */
  ngOnInit() {
    this.filterCriteria = {
      dateRangeFor: "last month",
      dateFrom: this.dateFormatService.dateRangeForFrom("last month"),
      dateTo: this.dateFormatService.newDate()
    };
    this.currentUser = this.authenticationService.currentUserValue;
    ClosetFactory.getAllClothes(this);
  }

  /*
  Called when a user selects a different option in the date range selector.
  The filter criteria is updated so that the date range (consisting of
  dateFrom and dateTo properties) is accurately represented.
  */
  updateFilterCriteria = (): Date =>
    this.filterCriteria.dateFrom = this.dateFormatService.dateRangeForFrom(
      this.filterCriteria.dateRangeFor);

}

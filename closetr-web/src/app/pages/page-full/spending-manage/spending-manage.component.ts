import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ClosetService } from '../../../services/closet.service';
import { AuthenticationService } from '../../../services/authentication.service';
import { DateFormatService } from '../../../services/utils/date-format.service';
import { DateRangeFilterPipe } from '../../../pipes/date-range-filter.pipe';
import { Clothing } from '../../../models/clothing.model';
import { User } from '../../../models/user.model';
import { ClosetFactory } from '../../../factories/closet.factory';

@Component({
  selector: 'app-spending-manage',
  templateUrl: './spending-manage.component.html'
})
/*
Page containing information about user's clothing spending. Contains an table
of recent purchases, which can be filtered by recency (date range). There is
also a search bar where the user can further filter the purchase table. An
'add manually' button allows the user to navigate to the Add Clothing page.

There is a progress bar that shows the user's progress through their budget for
some set date range, and a message to reflect how their progress. Beneath the
message is a link to the Budget Manage page.

closetList: an array consisting of all the user's clothing.

isDateRange: boolean indicating if the user wants to filter the purchase table
via a date range (defining both date from and to), or a date range up to today
(e.g. last week, last month).

searchCriteria: an object describing criteria pertaining to filtering the
purchase table, such as date to and from, etc.

availableDateRange: an array of available date range options to be shown in
the date range for selector.

currentUser: the user that is logged in.
*/
export class SpendingManageComponent implements OnInit {
  closetList: Array<Clothing>;
  isDateRange: boolean = false;
  searchCriteria: any;
  availableDateRange: any = [
    'last week',
    'last two weeks',
    'last month',
    'last 6 months',
    'last year'
  ];
  currentUser: User;

  constructor(private closetService: ClosetService,
              private dateFormatService: DateFormatService,
              private authenticationService: AuthenticationService) {
    const { newDate, formatDateString } = this.dateFormatService;
    this.searchCriteria = {
      property: "clothingPurchaseDate",
      dateRangeFor: "last month",
      dateFrom: newDate(),
      dateTo: newDate(),
      dateFromFormatted: formatDateString(new Date()),
      dateToFormatted: formatDateString(new Date())
    };
  }

  /*
  Initial data loading: retrieve the currently logged in user, and get that
  user's closet. Update the search criteria object to accurately represent
  the default setting (last month.)
  */
  ngOnInit() {
    this.currentUser = this.authenticationService.currentUserValue;
    ClosetFactory.getAllClothes(this)
    this.searchCriteriaChangeHandler();
  }

  /*
  Called whenever there are changed to the date range selectors, and updates
  the search criteria object to accurately represent the chosen date range.
  If the selector is for a date range (two selectors: one for date from, and
  another for date to), then the date from and date to properties are updated
  based on their formatted counterparts. If the selector is for a date range
  up to today (one selector), then the date range properties, along with their
  formatted counterparts, are updated to reflect that date range.
  */
  searchCriteriaChangeHandler(): void {
    const {
      newDate, formatStringDate, formatDateString
    } = this.dateFormatService;
    const {
      dateFromFormatted, dateToFormatted, dateFrom, dateTo, dateRangeFor,
      dateRangeForFrom
    } = this.searchCriteria;

    if (this.isDateRange) {
      // choosing date range: turn string format to date object.
      this.searchCriteria.dateFrom = formatStringDate(dateFromFormatted);
      this.searchCriteria.dateTo = formatStringDate(dateToFormatted);
    } else {
      // choosing date range up to today:
      // set date objects, then set string format from date objects.
      this.searchCriteria.dateFrom = dateRangeForFrom(dateRangeFor);
      this.searchCriteria.dateTo = this.dateFormatService.newDate();

      this.searchCriteria.dateFromFormatted = formatDateString(dateFrom);
      this.searchCriteria.dateToFormatted = formatDateString(dateTo);
    }
  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})

/*
Page containing all widgets in the dashboard. The dashboard is the page that
the user is redirected to upon logging in. It contains the Today Widget,
Closet Widget, Closet Stats Widget, and Budget Widget. Further descriptions
about these widgets will be found in the respective controller pages for these
widgets.
*/
export class DashboardComponent implements OnInit {
  constructor() { }

  ngOnInit() { }

}

import { Component, OnInit, Input } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';

@Component({
  selector: 'ui-back-button',
  templateUrl: './ui-back-button.component.html'
})
/*
Back arrow button component. Clicking this button will navigate the user to
the given url.

url: the url for the page to navigate to, when the button is clicked. Defaults
to "/" (dashboard.)
*/
export class UiBackButtonComponent implements OnInit {
  @Input() url: string = "/";

  constructor(private router: Router) { }

  /*
  Called when user clicks the back button. Navigates to the given url.
  */
  back = (): Promise<boolean> => this.router.navigate([this.url]);

  ngOnInit() { }

}

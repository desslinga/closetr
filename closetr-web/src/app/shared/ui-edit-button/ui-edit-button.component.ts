import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';

@Component({
  selector: 'ui-edit-button',
  templateUrl: './ui-edit-button.component.html'
})
/*
Edit (pencil) button component. Clicking this button will do one of two things
depending on the type input. If the type is 'button', then clicking the button
will invoke the click callback function specified in the parent component.
If the type is 'link', then the user will be navigated to the url given in
buttonLink. Edit button can be customized by size, and hidden (in which case it
will also be disabled.)

type: determines how the button will behave when clicked. Defaults to 'button',
in which case a callback which is defined in the parent component, will be
invoked when the button is clicked. If the type is 'link', then the user will
be navigated to the url given in buttonLink.

buttonLink: the url for where the user will navigate to, if the button is
clicked and it is of type 'link'.

hidden: boolean indicating whether the button will be displayed or not. If it
is hidden, it is also disabled.

size: size of the button icon. Defaults to 'lg' (large). Other options are 'md'
(medium). See ui-icon-sized component for how size affects the icon.
*/
export class UiEditButtonComponent implements OnInit {
  @Input() type: string = 'button';
  @Input() buttonLink: string = '/';
  @Input() hidden: boolean = false;
  @Input() size: string = 'lg';

  constructor(private router: Router) { }

  ngOnInit() { }

  /*
  Called when the button is clicked. Checks if the button is of type 'link',
  and that there is a url provided. If so, then the user is navigated to that
  url.
  */
  buttonClick(): void {
    if (this.buttonLink && this.type == 'link') {
      this.router.navigate([this.buttonLink]);
    }
  }
}

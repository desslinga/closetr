import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ui-close-button',
  templateUrl: './ui-close-button.component.html'
})
/*
Close "x" button component. Clicking this button will trigger some function
that exists in the parent component. Can be customized by type (depending
on parent component), and size. Close button can also be hidden, in which case
it will also be disabled.

type: how the button will be displayed. Defaults to 'button', with no
adjustments to positioning. If type is 'closet-card', then button's position
will be adjusted to fit properly on a Closet Card component.

hidden: boolean indicating whether the button will be displayed or not. If
it is hidden, it is also disabled.

size: size of the button icon. Defaults to 'lg' (large). Other options are
'md' (medium). See ui-icon-sized component for how size affects the icon.
*/
export class UiCloseButtonComponent implements OnInit {
  @Input() type: string = 'button';
  @Input() hidden: boolean = false;
  @Input() size: string = 'lg';

  constructor() { }

  ngOnInit() { }

}

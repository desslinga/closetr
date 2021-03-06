import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';

@Component({
  selector: 'ui-edit-button',
  templateUrl: './ui-edit-button.component.html'
})
export class UiEditButtonComponent implements OnInit {
  @Input() type: string = 'button';
  @Input() buttonLink: string = '/';
  @Input() hidden: boolean = false;
  @Input() size: string = 'lg';

  constructor(private router: Router) {}

  ngOnInit() {
  }

  buttonClick(): void {
    if (this.buttonLink && this.type == 'link') {
      this.router.navigate([this.buttonLink]);
    }
  }
}

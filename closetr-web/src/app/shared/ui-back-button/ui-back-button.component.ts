import { Component, OnInit, Input } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';

@Component({
  selector: 'ui-back-button',
  templateUrl: './ui-back-button.component.html'
})
export class UiBackButtonComponent implements OnInit {
  @Input() url: string = "/";

  constructor(private router: Router) { }

  back = (): Promise<boolean> => this.router.navigate([this.url]);

  ngOnInit() {
  }

}

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ui-input',
  templateUrl: './ui-input.component.html'
})
export class UiInputComponent implements OnInit {
  @Input() labelText: string = '';
  @Input() type: string = '';
  @Input() rows: number = 0;
  @Input() inputModel: any = null;
  @Input() placeholder: string = '';
  @Output() inputModelChange: EventEmitter<any> = new EventEmitter<any>();
  @Input() errorMessage: string = '';
  @Input() showError: boolean = false;
  @Input() disabled: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  modelChange(inputModel): void {
    this.inputModelChange.emit(inputModel);
  }
}

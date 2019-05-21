import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ui-filter-date',
  templateUrl: './ui-filter-date.component.html'
})
/*
Filter Date Selector component, which is used for filtering purposes (such as
filtering clothing lists, purchase tables). Filter Date Selector contains a
label, which is expected to be either 'to:' or 'from:'. The actual Date input
(excluding the label), adjusts its width according to its label. It also has a
change handler which is invoked every time the input is changed.

labelText: the text on the label next to the Date input.

inputModel: the object in the parent component, to which the data in the Date
input is bound.

inputModelChange: emitter that emits whenever there is a change to the Date
input, to be reflected on the inputModel.
*/
export class UiFilterDateComponent implements OnInit {
  @Input() labelText: string;
  @Input() inputModel: string;
  @Output() inputModelChange: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit() { }

  /*
  Called whenever there are changes to the Date input. This function emits an
  event through the inputModelChange emitter, to signal to the parent component
  that the object bound to inputModel should be updated.
  */
  changeHandler = (inputModel: string = this.inputModel): void =>
    this.inputModelChange.emit(inputModel);

}

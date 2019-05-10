import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-budget-manage',
  templateUrl: './budget-manage.component.html'
})
export class BudgetManageComponent implements OnInit {
  availableBudgetSpans: Array<string>;
  allBudgetSpans: Array<string> = [
    'select',
    'week',
    'two weeks',
    'month',
    '6 months',
    'year'
  ];
  selectedBudgetSpans: any = {
    'month': {
      'amount': 200,
      'rollover': false
    }
  };
  selectedBudgetSpan: string = 'select';
  editMode: boolean = false;

  constructor() { }

  ngOnInit() {
    this.getAvailableBudgetSpans();
  }

  addBudgetSpan(budgetSpan: string): void {
    this.selectedBudgetSpans[budgetSpan] = {
      'amount': 100,
      'rollover': false
    }
    this.getAvailableBudgetSpans();
    this.selectedBudgetSpan = 'select';
  }

  /*
  Toggles edit mode on and off.
  */
  toggleEditMode = (): boolean => this.editMode = !this.editMode;

  getAvailableBudgetSpans = (): Array<string> => this.availableBudgetSpans =
    this.allBudgetSpans.filter(budgetSpan =>
      !Object.keys(this.selectedBudgetSpans).includes(budgetSpan));

}

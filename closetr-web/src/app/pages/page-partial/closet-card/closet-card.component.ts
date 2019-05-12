import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { ClosetService } from '../../../services/closet.service';
import { Clothing } from '../../../models/clothing.model';

@Component({
  selector: 'app-closet-card',
  templateUrl: './closet-card.component.html'
})
/*
Component that contains information and controls about one piece of clothing.
It is displayed as a card, with an image of the given clothing on the upper
half, and a caption containing the clothing name, cost, and number of times
worn, in the bottom half. Closet card contains controls that allow a user to
delete or edit the clothing. Ability to edit clothing is controlled by editMode,
and ability to delete clothing is determined by the type of page containing the
card. Controls are represented by icons: pencil for edit, and 'x' for delete.
Clicking on the edit icon will take the user to the Edit Clothing page.

clothing: Clothing object that is being displayed by the closet card.

editMode: boolean to indicate whether or not it is edit mode.

removeCardEmit: emitter which emits whenever a user has clicked the delete icon.

isClosetManage: boolean to indicate whether or not the page containing this
card is the Closet Manage page.
*/
export class ClosetCardComponent implements OnInit {

  @Input() clothing: Clothing;
  @Input() editMode: boolean;
  @Output() removeCardEmit: EventEmitter<Object> = new EventEmitter<Object>();
  isClosetManage: boolean;

  constructor(
    private router: Router,
    private closetService: ClosetService) {
  }

  /*
  Initial data loading: determine whether page containing this card is the
  Closet Manage page, and set isClosetManage appropriately.
  */
  ngOnInit() {
    this.isClosetManage = (this.router.url === '/closet-manage');
  }

  /*
  Toggles edit mode on and off.
  */
  toggleEditMode = (): boolean => this.editMode = !this.editMode;

  /*
  Input: clothingID of this clothing.
  Called when the delete icon is clicked. This function emits an event through
  the removeCardEmit emitter, to signal to the parent component that this card
  is to be deleted.
  */
  removeCard = (clothingID: any): void => this.removeCardEmit.emit(clothingID);

  /*
  Input: this clothing
  Called when the edit icon is clicked. This function navigates to the
  Edit Clothing page, with an extension of this clothing's clothingID.
  */
  editCard(clothing: Clothing): void {
    this.closetService.setClothingForEdit(clothing);
    this.router.navigate(['/edit-clothing', clothing.clothingID]);
  }

}

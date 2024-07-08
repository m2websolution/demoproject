import { Component, ViewEncapsulation } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ConfirmationModelComponent } from 'src/app/shared/components/confirmation-model/confirmation-model.component';

@Component({
  selector: 'app-user-delete-modal',
  templateUrl: './user-delete-modal.component.html',
  styleUrls: ['./user-delete-modal.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class UserDeleteModalComponent {
  constructor(private dialogRef: MatDialogRef<ConfirmationModelComponent>){}

  /**
   * Function: Closes the dialog with true.
   */
  confirm(): void {
    this.dialogRef.close(true);
  }
  /**
    * Function: Closes the dialog with false.
    */
  cancel(): void {
    this.dialogRef.close(false);
  }
}

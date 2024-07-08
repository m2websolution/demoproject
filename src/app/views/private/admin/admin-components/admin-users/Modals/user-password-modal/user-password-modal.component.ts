import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-user-password-modal',
  templateUrl: './user-password-modal.component.html',
  styleUrls: ['./user-password-modal.component.css']
})
export class UserPasswordModalComponent {

  userPasswordForm: FormGroup;
  hide: boolean;
  hide1: boolean;
  hide2: boolean;

  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<UserPasswordModalComponent>) {
    this.userPasswordForm = this.fb.group({
      password: ['', [Validators.required, Validators.pattern(
        '^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[#?!@$%^&*-]).{8,}$'
      )]],
      confirmPassword: ['', [Validators.required]],
    }, { validators: this.passwordMatchValidator });
    this.hide = true;
    this.hide1 = true;
    this.hide2 = true;
  }

   /**
  * Function: Validate password and confirm password is equal or not.
  * @params form
  */
   passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }


  /**
    * Function: Closes the dialog with true.
    */
  submit(): void {
    this.dialogRef.close(this.userPasswordForm.value);
  }
  /**
    * Function: Closes the dialog with false.
    */
  cancel(): void {
    this.dialogRef.close(false);
  }
}

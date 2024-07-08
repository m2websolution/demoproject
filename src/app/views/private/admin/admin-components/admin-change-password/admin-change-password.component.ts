import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PrivateServices } from 'src/app/services/PrivateServices';
import { AppConstant } from 'src/app/shared/constants';
import { ErrorHandlerService } from 'src/app/shared/services/ErrorHandler.service';
import { CommonService } from 'src/app/shared/services/common.services';

@Component({
  selector: 'app-admin-change-password',
  templateUrl: './admin-change-password.component.html',
  styleUrls: ['./admin-change-password.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AdminChangePasswordComponent implements OnInit {
  hide = true;
  hide1 = true;
  hide2 = true;
  passwordForm: FormGroup;
  isButtonDisabled: boolean = false;

  constructor(private formBuilder: FormBuilder, private commonService: CommonService,
    private privateService: PrivateServices, private errorHandler: ErrorHandlerService) { }

  ngOnInit(): void {
    this.passwordForm = this.formBuilder.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.pattern(
        '^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[#?!@$%^&*-]).{8,}$'
      )]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.matchPasswords });
  }

  /**
 * Function: Submits the change of account password.
 */
  onSubmit(): void {
    if (this.passwordForm.valid) {
      this.isButtonDisabled = true;
      const payload: any = {
        Key: this.commonService.GetLocalStorage(AppConstant.localStorage_Token),
        OldPassword: this.passwordForm.value.oldPassword,
        NewPassword: this.passwordForm.value.newPassword
      }

    } else {
      this.passwordForm.markAllAsTouched();
      this.commonService.SnackObervable('Invalid Form');
      this.resetForm();
    }
  }

  /**
   * Custom validator function to check if "New Password" and "Confirm Password" match.
   */
  matchPasswords(group: FormGroup): { [key: string]: boolean } | null {
    const newPassword = group.get('newPassword').value;
    const confirmPassword = group.get('confirmPassword').value;

    if (newPassword !== confirmPassword) {
      group.get('confirmPassword').setErrors({ passwordsNotMatch: true });
      return { 'passwordsNotMatch': true };
    }
    return null;
  }

  /**
 * Function: Reset the password form.
 */
  resetForm(): void {
    this.passwordForm.reset();
    this.passwordForm.markAsUntouched();
    this.isButtonDisabled = false;
  }
}

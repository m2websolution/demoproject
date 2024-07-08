import { Component, ElementRef, EventEmitter, Inject, Input, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { debounceTime, distinctUntilChanged, fromEvent } from 'rxjs';
import { PrivateServices } from 'src/app/services/PrivateServices';
import { AppConstant } from 'src/app/shared/constants';
import { ErrorHandlerService } from 'src/app/shared/services/ErrorHandler.service';
import { CommonService } from 'src/app/shared/services/common.services';
import { PagerService } from 'src/app/shared/services/pager.service';

@Component({
  selector: 'app-user-edit-modal',
  templateUrl: './user-edit-modal.component.html',
  styleUrls: ['./user-edit-modal.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class UserEditModalComponent {
  @Output() closeModalEvent = new EventEmitter<boolean>();
  selected: any = [];
  userForm: FormGroup;
  isButtonDisabled: boolean;
  landindPage: boolean;
  widgets: boolean;
  invites: boolean;
  reporting: boolean;
  profileList: any[];

  constructor(@Inject(MAT_DIALOG_DATA) public dialogdata: any, private fb: FormBuilder, private privateServices: PrivateServices, private commonService: CommonService, private errorHandler: ErrorHandlerService, private dialogRef: MatDialogRef<UserEditModalComponent>) {
    this.userForm = this.fb.group({
      Id: 0,
      FirstName: ['', [Validators.required]],
      LastName: ['', [Validators.required]],
      Email: ['', [Validators.required, Validators.email]],
      HasApi: [false, [Validators.required]],
      HasSSO: [false, [Validators.required]],
      Key: ['', [Validators.required]],
      Permission: ['', [Validators.required]],
      CanLogin: [false, [Validators.required]],
      ProfileId: [[]],
      landingPage: false,
      widgets: false,
      invites: false,
      reporting: false
    });
    this.isButtonDisabled = false;
    this.userForm.get('Key').setValue(this.commonService.GetLocalStorage(AppConstant.localStorage_Token))
  }

  ngOnInit() {
    this.commonService.$profileValueSubject.subscribe(value => {
      this.profileList = value;
      this.userForm.get('ProfileId').setValue([this.profileList[0].ProfileId]);
      this.selected[0] = this.profileList[0].CompanyName;
    });
    if (this.dialogdata.isEdit) {
      this.userForm.get('FirstName').setValue(this.dialogdata.dataSource.FirstName);
      this.userForm.get('LastName').setValue(this.dialogdata.dataSource.LastName);
      this.userForm.get('Email').setValue(this.dialogdata.dataSource.Email);
      this.userForm.get('HasApi').setValue(this.dialogdata.dataSource.HasApi);
      this.userForm.get('CanLogin').setValue(this.dialogdata.dataSource.CanLogin);
      this.userForm.get('Id').setValue(this.dialogdata.dataSource.Id);
      this.userForm.get('ProfileId').setValue(this.dialogdata.dataSource.ProfileList.map(x => x.ProfileId));
      if (this.dialogdata.dataSource.Permissions.includes(`"Landing Page\":true`)) {
        this.userForm.get('landingPage').setValue(true);
      }
      if (this.dialogdata.dataSource.Permissions.includes(`"Widgets\":true`)) {
        this.userForm.get('widgets').setValue(true);
      }
      if (this.dialogdata.dataSource.Permissions.includes(`"Invites\":true`)) {
        this.userForm.get('invites').setValue(true);
      }
      if (this.dialogdata.dataSource.Permissions.includes(`"Reporting\":true`)) {
        this.userForm.get('reporting').setValue(true);
      }
      this.selected = this.dialogdata.dataSource.ProfileList.map(x => x.CompanyName);
    }
    this.userForm.get('ProfileId').valueChanges.subscribe((value: string[]) => {
      const filteredObjects = this.profileList.filter(obj => value.includes(obj.ProfileId));
      // Store the value of another property (e.g., 'value') in a new array
      this.selected = filteredObjects.map(obj => obj.CompanyName);
    });
  }

  /**
    * Function: Submits the data for team account creation.
    */
  submit(): void {
    this.userForm.get('Permission').setValue(`{\"Landing Page\":${this.userForm.get('landingPage').value},\"Widgets\":${this.userForm.get('widgets').value},\"Invites\":${this.userForm.get('invites').value},\"Reporting\":${this.userForm.get('reporting').value}}`);
    this.userForm.get('landingPage').setValue(null);
    this.userForm.get('widgets').setValue(null);
    this.userForm.get('invites').setValue(null);
    this.userForm.get('reporting').setValue(null);
    if (this.dialogdata.isEdit) {
      this.updateUserAccount();
    } else {
      this.createAccount();
    }
  }

  /**
    * Function: Creates an account.
    */
  createAccount(): void {
    if (this.userForm.valid) {
     
    }
    else {
      this.userForm.markAllAsTouched();
      this.commonService.SnackObervable('Invalid Form');
    }
  }

  /**
   * Function: Updates an account.
   */
  updateUserAccount(): void {
    if (this.userForm.valid) {
 
    }
    else {
      this.userForm.markAllAsTouched();
      this.commonService.SnackObervable('Invalid Form');
    }
  }
}

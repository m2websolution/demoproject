import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PrivateServices } from 'src/app/services/PrivateServices';
import { AppConstant } from 'src/app/shared/constants';
import { ErrorHandlerService } from 'src/app/shared/services/ErrorHandler.service';
import { CommonService } from 'src/app/shared/services/common.services';

@Component({
  selector: 'app-employee-qr-code',
  templateUrl: './employee-qr-code.component.html',
  styleUrls: ['./employee-qr-code.component.css']
})
export class EmployeeQrCodeComponent {

  employeeForm: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any, private fb: FormBuilder, private commonService: CommonService, private privateService: PrivateServices, private errorHandler: ErrorHandlerService, private dialogRef: MatDialogRef<EmployeeQrCodeComponent>) {
    this.employeeForm = this.fb.group({
      Key: '',
      Id:0,
      ProfileId: '',
      EmployeeFirstName: ['', [Validators.required]],
      EmployeeLastName: ['', [Validators.required]],
      Department: ['', [Validators.required]],
    });
    this.employeeForm.get('Key').setValue(this.commonService.GetLocalStorage(AppConstant.localStorage_Token));
    this.employeeForm.get('ProfileId').setValue(this.commonService.GetLocalStorage('profileId'));
    this.employeeForm.get('Id').setValue(null);
  }

  ngOnInit() {
    if (this.dialogData.mode === 'edit') {
      this.employeeForm.get('EmployeeFirstName').setValue(this.dialogData.employee.EmployeeName.split(' ')[0]);
      this.employeeForm.get('EmployeeLastName').setValue(this.dialogData.employee.EmployeeName.split(' ')[1]);
      this.employeeForm.get('Department').setValue(this.dialogData.employee.Department);
      this.employeeForm.get('Id').setValue(this.dialogData.employee.Id);
      this.employeeForm.get('ProfileId').setValue(null);
    }
  }

  /**
    * Function: Generates an employee
    */
  generateEmployeeQR(): void {
    this.commonService.SpinnerObervable(true);
    if (this.dialogData.mode === 'edit') {
      this.updateEmployee();
    } else {
      this.addEmployee();
    }
  }

  /**
   * Function: Updates an employee detail.
   */
  updateEmployee(): void {
   
  }

  /**
   * Function: Adds an employee detail.
   */
  addEmployee(): void {
  
  }

}

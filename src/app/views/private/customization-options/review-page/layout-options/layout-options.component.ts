import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PrivateServices } from 'src/app/services/PrivateServices';
import { AppConstant } from 'src/app/shared/constants';
import { ErrorHandlerService } from 'src/app/shared/services/ErrorHandler.service';
import { CommonService } from 'src/app/shared/services/common.services';

@Component({
  selector: 'app-layout-options',
  templateUrl: './layout-options.component.html',
  styleUrls: ['./layout-options.component.css']
})
export class LayoutOptionsComponent {
  @Input() layout: any;
  layoutForm: FormGroup;

  constructor(private fb: FormBuilder, private commonService: CommonService, private privateService: PrivateServices, private errorHandler: ErrorHandlerService) {
    this.layoutForm = this.fb.group({
      key: '',
      profileId: '',
      GoodExperienceMessage: ['', [Validators.required]],
      BadExperienceMessage: ['', [Validators.required]],
      NotLikelyAtAllMessage: ['', [Validators.required]],
      ExtremelyLikelyMessage: ['', [Validators.required]],
      GoodFaceMessage: ['', [Validators.required]],
      OkayFaceMessage: ['', [Validators.required]],
      BadFaceMessage: ['', [Validators.required]],
    });

    this.layoutForm.get('key').setValue(this.commonService.GetLocalStorage(AppConstant.localStorage_Token));
    this.layoutForm.get('profileId').setValue(this.commonService.GetLocalStorage('profileId'));
  }

  ngOnInit() {
    if (this.layout) {
      this.layoutForm.get('GoodExperienceMessage').setValue(this.layout.GoodExperienceMessage);
      this.layoutForm.get('BadExperienceMessage').setValue(this.layout.BadExperienceMessage);
      this.layoutForm.get('NotLikelyAtAllMessage').setValue(this.layout.NotLikelyAtAllMessage);
      this.layoutForm.get('ExtremelyLikelyMessage').setValue(this.layout.ExtremelyLikelyMessage);
      this.layoutForm.get('GoodFaceMessage').setValue(this.layout.GoodFaceMessage);
      this.layoutForm.get('OkayFaceMessage').setValue(this.layout.OkayFaceMessage);
      this.layoutForm.get('BadFaceMessage').setValue(this.layout.BadFaceMessage);
    }
  }

  /**
   * Function: Update the layout options
   */
  submit(): void {
    
  }
}
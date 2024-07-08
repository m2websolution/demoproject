import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PrivateServices } from 'src/app/services/PrivateServices';
import { AppConstant } from 'src/app/shared/constants';
import { ErrorHandlerService } from 'src/app/shared/services/ErrorHandler.service';
import { CommonService } from 'src/app/shared/services/common.services';

@Component({
  selector: 'app-header-options',
  templateUrl: './header-options.component.html',
  styleUrls: ['./header-options.component.css']
})
export class HeaderOptionsComponent {
  @Input() header: any;
  state: any = {
    fontColor: '#b86565',
    backColor: '#0e0707',
  };
  headerForm: FormGroup;

  tabData: any = ['LIGHT', 'DARK', 'CUSTOM'];

  changehandler(event: any) {
    this.state = {
      ...this.state,
      [event.target.id]: event.target.value,
    };
    if (event.target.id === 'fontColor') {
      this.headerForm.get('HeaderFontColor').setValue(event.target.value)
    }
    if (event.target.id === 'backColor') {
      this.headerForm.get('HeaderBackgroundColor').setValue(event.target.value)
    }
  }

  constructor(private fb: FormBuilder, private commonService: CommonService, private privateService: PrivateServices, private errorHandler: ErrorHandlerService) {
    this.headerForm = this.fb.group({
      key: '',
      profileId: '',
      HeaderFontColor: ['', [Validators.required]],
      HeaderBackgroundColor: ['', [Validators.required]],
      HeaderMessage: ['', [Validators.required]],
      WelcomeMessage: ['', [Validators.required]],
      BodyMessage: ['', [Validators.required]],
      ThankyouMessage: ['', [Validators.required]],
    });
    this.headerForm.get('key').setValue(this.commonService.GetLocalStorage(AppConstant.localStorage_Token));
    this.headerForm.get('profileId').setValue(this.commonService.GetLocalStorage('profileId'));
  }

  ngOnInit() {
    if (this.headerForm) {
      this.headerForm.get('HeaderFontColor').setValue(this.header.HeaderFontColor);
      this.headerForm.get('HeaderBackgroundColor').setValue(this.header.HeaderBackgroundColor);
      this.headerForm.get('HeaderMessage').setValue(this.header.HeaderMessage);
      this.headerForm.get('WelcomeMessage').setValue(this.header.WelcomeMessage);
      this.headerForm.get('BodyMessage').setValue(this.header.BodyMessage);
      this.headerForm.get('ThankyouMessage').setValue(this.header.ThankyouMessage);
    }
  }

  /**
   * Function: Update the header options
   */
  submit(): void {
    
  }
}

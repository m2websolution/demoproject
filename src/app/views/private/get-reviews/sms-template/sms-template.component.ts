import { ChangeDetectorRef, Component, ElementRef, Inject, Input, Renderer2 } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CommonService } from 'src/app/shared/services/common.services';

@Component({
  selector: 'app-sms-template',
  templateUrl: './sms-template.component.html',
  styleUrls: ['./sms-template.component.css']
})
export class SmsTemplateComponent {
  @Input() templateType: any;
  @Input() message: string;
  @Input() logo: string;

  userMessage: SafeHtml;
  breakPoint: number = 6;
  heightManage: any;
  companyName: any;
  isCompany: boolean = false;

  constructor(public sanitizer: DomSanitizer, private commonService: CommonService, @Inject(MAT_DIALOG_DATA) public dialogData: any) {
    this.userMessage = '';
    this.companyName = this.commonService.GetLocalStorage('CompanyName');
  }

  ngOnInit() {
    if (this.message) {
      this.userMessage = this.sanitizer.bypassSecurityTrustHtml(this.formatStringToHtml(this.message));
    }
    if (this.dialogData.emailData) {
      this.userMessage = this.sanitizer.bypassSecurityTrustHtml(this.formatStringToHtml(this.dialogData.emailData));
      this.logo = this.dialogData.logo;
    }
    if (this.logo === null) {
      this.isCompany = true;
    }
  }

  ngOnChanges() {
    if (this.message) {
      this.userMessage = this.sanitizer.bypassSecurityTrustHtml(this.formatStringToHtml(this.message));
    }
  }

  /**
    * Function: To replace the selected item from message based on replacement value.
    * @param template: message  
    * @returns string : after changing the message with line break.
    */
  formatStringToHtml(template: string): string {
    let formattedHtml;
    if (template) {
      formattedHtml = template.replace(/\n/g, '<br>');
    }
    return formattedHtml;
  }

  onResize(event: any) {
    if (window.innerWidth > 700 && window.innerWidth < 1200) {
      this.breakPoint = 2;
    } else if (window.innerWidth > 1200) {
      this.breakPoint = 4;
    } else {
      this.breakPoint = 1;
    }
    this.heightManage = {
      first: this.breakPoint == 1 ? '70px' : '120px',
    };
  }

}

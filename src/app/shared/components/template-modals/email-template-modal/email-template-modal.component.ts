import { ChangeDetectorRef, Component, ElementRef, Inject, Input, Renderer2, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CommonService } from 'src/app/shared/services/common.services';

@Component({
  selector: 'app-email-template-modal',
  templateUrl: './email-template-modal.component.html',
  styleUrls: ['./email-template-modal.component.css'],
  encapsulation: ViewEncapsulation.None // Disable encapsulation
})
export class EmailTemplateModalComponent {
  breakPoint: number = 6;
  heightManage: any;
  @Input() preview: string;
  @Input() logo: string;
  @Input() index: number;
  userPreview: SafeHtml;
  companyName: any;
  isCompany: boolean = false;

  constructor(public sanitizer: DomSanitizer, private renderer: Renderer2, private elRef: ElementRef, private cdr: ChangeDetectorRef, private commonService: CommonService, @Inject(MAT_DIALOG_DATA) public dialogData: any) { 
    this.userPreview = '';
    this.companyName = this.commonService.GetLocalStorage('CompanyName');
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

  ngOnInit() {
    if (this.preview) {
      this.userPreview = this.sanitizer.bypassSecurityTrustHtml(this.formatStringToHtml(this.preview));
    }
    if (this.dialogData.emailData) {
      this.userPreview = this.sanitizer.bypassSecurityTrustHtml(this.formatStringToHtml(this.dialogData.emailData));
      this.logo = this.dialogData.logo;
    }
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

    if (this.logo === null) {
      this.isCompany = true;
    }
  }

  ngOnChanges() {
    if (this.preview) {
      this.userPreview = this.sanitizer.bypassSecurityTrustHtml(this.formatStringToHtml(this.preview));
    }
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

import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmationModelComponent } from 'src/app/shared/components/confirmation-model/confirmation-model.component';
import { Star } from 'src/app/shared/components/start-rating/start-rating.component';
import { CommonService } from 'src/app/shared/services/common.services';

@Component({
  selector: 'app-email-widgets',
  templateUrl: './email-widgets.component.html',
  styleUrls: ['./email-widgets.component.css'],
})
export class EmailWidgetsComponent {
  rating: any;
  votes: any;
  average: any;
  starwidth: any = { width: ' 50px', height: 'auto' };
  stars: Star[];
  permissionsString: string;
  permissions: any = {};
  emaiilVisible: boolean = true;
  userType: string;

  constructor(private commonService: CommonService, private dialog: MatDialog, public router: Router) {
    this.stars = [
      { value: 1, checked: false, display: 'Aweful' },
      { value: 2, checked: false, display: 'Poor' },
      { value: 3, checked: false, display: 'Average' },
      { value: 4, checked: false, display: 'Good' },
      { value: 5, checked: false, display: 'Excellent' },
    ];

    this.permissionsString = this.commonService.GetLocalStorage('Permissions');
    this.permissions = JSON.parse(this.permissionsString);
    this.userType = this.commonService.GetLocalStorage('userType');
  }

  setValues(e: any) {
    this.rating = e.rating;
    this.average = e.average;
    this.votes = e.votes;
  }

  ngOnInit() {
    if (window.innerWidth > 700 && window.innerWidth < 1200) {
    } else if (window.innerWidth > 1200) {
    } else {
      this.starwidth = { width: ' 32px', height: '40px' };
    }

    if (!this.permissions.HasEmailWidget && this.userType === 'Business User' || this.userType === 'Agency User') {
      this.emaiilVisible = false;
    }
  }

  onResize(event: any) {
    if (window.innerWidth > 700 && window.innerWidth < 1200) {
    } else if (window.innerWidth > 1200) {
    } else {
      this.starwidth = { width: ' 32px', height: '40px' };
    }
  }

  /**
    * Function: Copy the layout of the selected widget
    * @param containerid: class id
    */
  copyToClipboard(containerid: string): void {
    var range = document.createRange();
    range.selectNode(document.getElementById(containerid));
    window.getSelection().removeAllRanges(); // clear current selection
    window.getSelection().addRange(range); // to select text
    document.execCommand("copy");
    window.getSelection().removeAllRanges();
    this.commonService.SnackObervable('Copied!');
  }

  /**
   * Function: Copy the html of the selected widget
   * @param containerid: class id
   */
  copyHTML(containerid: string): void {
    var copyText = document.getElementById(containerid).outerHTML;
    const el = document.createElement('textarea');
    el.value = copyText;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    this.commonService.SnackObervable('HTM Code Copied!');
  }


  /**
  * Function: Show the upgrade plan popup.
  */
  openPermissionDialog(): void {
    const ref: MatDialogRef<ConfirmationModelComponent> = this.dialog.open(ConfirmationModelComponent, {
      width: '50%',
      maxWidth: '480px',
      height: '50%',
      panelClass: 'custom-container',
      data: {
        message: 'upgrade',
      },
      backdropClass: 'confirmDialogComponent',
      hasBackdrop: true,
    });

    ref.afterClosed().subscribe(result => {
      if (result) {
        this.router.navigate(
          ['/admin'],
          { queryParams: { redirectPath: 'upgrade' } }
        );
      } else {
        this.commonService.SpinnerObervable(false);
      }
    });
  }
}

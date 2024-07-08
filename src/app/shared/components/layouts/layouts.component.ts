import { Component, HostListener, OnInit } from '@angular/core';
import { LayoutService } from '../../services/layout.service';
import { MatSidenav } from '@angular/material/sidenav';
import { Breakpoints } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { CommonService } from '../../services/common.services';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PrivateServices } from 'src/app/services/PrivateServices';
import { ErrorHandlerService } from '../../services/ErrorHandler.service';
import { ConfirmationModelComponent } from '../confirmation-model/confirmation-model.component';
import { AppConstant } from '../../constants';

@Component({
  selector: 'app-layouts',
  templateUrl: './layouts.component.html',
  host: {
    "(document:keydown)": "handleKeyboardEventDown($event)",
    "(document:keyup)": "handleKeyboardEventDown($event)",
    "(document:click)": "handleKeyboardEventDown($event)",
    "(document:mousemove)": "handleKeyboardEventDown($event)",
  },
})
export class LayoutsComponent implements OnInit {
  drawer?: MatSidenav;
  isMobileView?: boolean;
  screenView?: 'sm' | 'md' | 'lg' = this.layoutService.screenSize;
  scroll = false;
  timeoutInSeconds: number = 30 * 60; 
  timeoutMilliseconds: number = this.timeoutInSeconds * 1000; 
  timeoutHandle: any;
  key: string;

  constructor(private layoutService: LayoutService,
    private commonService: CommonService,
    private errorHandler: ErrorHandlerService,
    private privateService: PrivateServices,
    private dialog: MatDialog,
    public router: Router
  ) {
    this.key = this.commonService.GetLocalStorage(AppConstant.localStorage_Token);
    if (document) {
    }
  }
  ngOnInit() {
    this.isMobileView = this.layoutService.isMobileView;
    this.layoutService.screenView.subscribe((value) => {
      value.breakpoints[Breakpoints.Medium]
        ? (this.screenView = 'md')
        : value.breakpoints[Breakpoints.Small] ||
          value.breakpoints[Breakpoints.HandsetPortrait]
        ? (this.screenView = 'sm')
        : (this.screenView = 'lg');

      this.isMobileView = this.screenView === 'sm' ? true : false;
      this.drawer?.toggle(this.isMobileView);
    });

    this.startTimers();

    setTimeout(() => {
      this.add30Seconds();
    }, 1000); 
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(e: any) {
    if (e) {
      this.scroll = true;
    }
  }

  /**
 * Function: Starts timers for session timeout.
 */
  startTimers(): void {
    this.timeoutHandle = setTimeout(() => this.idleTimeout(), this.timeoutMilliseconds);
  }

  /**
 * Function: Resets session timeout timers.
 */
  resetTimers(): void {
    clearTimeout(this.timeoutHandle);
    this.timeoutInSeconds =  30 * 60;
    this.startTimers();
  }

  /**
 * Function: Adds 30 seconds to the session timeout countdown.
 */
  add30Seconds(): void {
    this.timeoutInSeconds =  30 * 60;
    this.timeoutMilliseconds = this.timeoutInSeconds * 1000;
    this.resetTimers();
  }

  /**
 * Function: Handles idle timeout and prompts user to confirm activity.
 * If user confirms, logs out; otherwise, restarts timeout timer.
 */
  idleTimeout(): void {
    const URLS = ["forgot-password", "signup", "signin","verification","welcome-screen","/feedback/"];
    const findUrl = URLS.filter((res) => window.location.href.includes(res));
    
    if (findUrl.length === 0) {
      const ref: MatDialogRef<ConfirmationModelComponent> = this.dialog.open(
        ConfirmationModelComponent,
        {
          width: '616px',
          maxWidth: '720px',
          height: '756px',
          panelClass: 'custom-container',
          data: {
            message: 'Do you continue on session.',
          },
          backdropClass: 'confirmDialogComponent',
          hasBackdrop: true,
        }
      );
  
      // Handle dialog close event
      ref.afterClosed().subscribe(result => {
        if (result) {
          this.logout();
        } else {
          this.resetTimers();
        }
      });
    }
  }  

  /**
 * Function: Handles keyboard events to reset session timeout timer.
 * @param event The keyboard event that occurred.
 */
  handleKeyboardEventDown(event: Event) {
    this.resetTimers();
  }

  /**
  * Function: Logout from the account.
  */
  logout(): void {
    this.commonService.SpinnerObervable(true);
    
  }
}

import { Component, OnInit } from '@angular/core';
import { IconService } from './shared/services/icon.service';
import { CommonService } from './shared/services/common.services';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PrivateServices } from './services/PrivateServices';
import { ErrorHandlerService } from './shared/services/ErrorHandler.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  isSpin: boolean;
  durationInSeconds: number;
  domain: string;
  brandingDetail: any;

  constructor(iconService: IconService, private commonService: CommonService, private _snackBar: MatSnackBar, private errorHandler: ErrorHandlerService, private privateService: PrivateServices) {
    this.isSpin = false;
    this.durationInSeconds = 5;
    iconService.init();
    this.domain = 'reviews.abcd.com';
    this.commonService.$Spinner.subscribe(x => {
      setTimeout(() => {
        this.isSpin = x;
      });
    })
  }

  ngOnInit(): void {
    this.commonService.$Snackbar.subscribe(x => {
      if (x !== "") {
        this._snackBar.open(x, "close", { duration: this.durationInSeconds * 1000 });
      }
    });
    // this.getBranding();
  }

  /**
  * Function: To get branding details.
  */
  getBranding(): void {
    this.commonService.SpinnerObervable(true);
    
  }

  ngOnDestroy(): void {
    this.commonService.$Spinner.unsubscribe();
  }
}

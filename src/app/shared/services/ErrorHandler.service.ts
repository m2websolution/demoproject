import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonService } from './common.services';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private commonService: CommonService) { }

  /**
   * Function: Handles api exception
   * @param error api exception
   */
  // Used any as getting different type of exceptions
  catchError(error: any): void {
    this.commonService.SpinnerObervable(false);
    if (error instanceof HttpErrorResponse) {
      // Handle HTTP errors
      this.commonService.SnackObervable('Please try again');
    } else if (error.result) {
      this.commonService.SnackObervable(error.result.message);
    } else {
      // Handle other errors
      this.commonService.SnackObervable(error.message);
    }
  }
}

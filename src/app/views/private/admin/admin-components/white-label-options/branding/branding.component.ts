import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PrivateServices } from 'src/app/services/PrivateServices';
import { AppConstant } from 'src/app/shared/constants';
import { ErrorHandlerService } from 'src/app/shared/services/ErrorHandler.service';
import { CommonService } from 'src/app/shared/services/common.services';

@Component({
  selector: 'app-branding',
  templateUrl: './branding.component.html',
  styleUrls: ['./branding.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class BrandingComponent {
  isDetail: any = false;
  key: string;
  adminDetails: any[];

  constructor(private commonService: CommonService, private privateService: PrivateServices, private errorHandler: ErrorHandlerService, private router: Router) {
    this.key = this.commonService.GetLocalStorage(AppConstant.localStorage_Token);
  }

  ngOnInit(){
    this.getAdminDetails();
  }

  /**
   * Function: Gets admin details.
   */
  getAdminDetails(): void {
   
  }


  /**
  * Function: Redirects to dashboard with selected company.
  * @param company: companyName
  */
  viewProfile(company: string): void {
    this.commonService.companyName = company;
    const profileId = this.commonService.profiles.find(x => x.CompanyName === company).ProfileId;
    this.commonService.AddLocalStorage('profileId', profileId);
    this.router.navigate(['/dashboard']);
  }
}

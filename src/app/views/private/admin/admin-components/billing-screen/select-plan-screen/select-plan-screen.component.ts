import { Component, ViewEncapsulation } from '@angular/core';
import { PrivateServices } from 'src/app/services/PrivateServices';
import { AppConstant } from 'src/app/shared/constants';
import { ErrorHandlerService } from 'src/app/shared/services/ErrorHandler.service';
import { CommonService } from 'src/app/shared/services/common.services';

@Component({
  selector: 'app-select-plan-screen',
  templateUrl: './select-plan-screen.component.html',
  styleUrls: ['./select-plan-screen.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class SelectPlanScreenComponent {
  name = 'Angular';
  firstGroup: any;
  bvariable = 0;
  tabIndex = 0;
  key: string;
  businessPlanList: any[] = [];
  selectedPlan: any;
  dynamicPlanList: any;
  toggleValueStandard: boolean = false;
  planName: string = 'business';
  billingDetails: any;
  currentPlan: any;
  planListTab1: any[] = [];

  onChange(s: any): void {
    this.tabIndex = s;
    this.planName = this.tabIndex === 1 ? 'agency' : 'business';
    this.firstGroup = this.tabIndex === 1 ? this.planListTab1[0].id : this.businessPlanList[0].id;
    this.selectedPlan = this.tabIndex === 1 ? { ...this.dynamicPlanList?.Data?.AgencyPlanList?.list[0], 'monthlyPlanId': this.dynamicPlanList.Data.AgencyPlanList.monthlyPlanId } : this.dynamicPlanList.Data.PlanList[0];
    if (this.planName === 'agency') {
      this.toggleValueStandard = false;
    }
  }
  
  constructor(private privateService: PrivateServices,
    private errorHandler: ErrorHandlerService,
    private commonService: CommonService) {
    this.key = this.commonService.GetLocalStorage(AppConstant.localStorage_Token);
    this.getdynamicPlanList();
  }

  onFirstGroupChange(item: any, type: string) {
    if (type === 'business') {
      this.selectedPlan = this.dynamicPlanList?.Data?.PlanList?.find((res) => { return res?.PlanName.toLocaleUpperCase() === item?.title });
    }
    else {
      this.selectedPlan = { ...this.dynamicPlanList?.Data?.AgencyPlanList?.list?.find((res) => { return res?.planName.toLocaleUpperCase() === item?.title }), 'monthlyPlanId': this.dynamicPlanList.Data.AgencyPlanList.monthlyPlanId }
    }
    if (this.firstGroup === 1) {
      this.bvariable = this.firstGroup;
    } else {
      this.bvariable = 0;
    }
  }

  /**
 * Function: getdynamicPlanList
 * Description: Retrieves the dynamic plan list from the server and handles the response.
 */
  getdynamicPlanList() {
  
  }
}

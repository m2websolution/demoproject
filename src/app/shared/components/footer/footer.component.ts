import { Component, Input } from '@angular/core';
import { CommonService } from '../../services/common.services';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
  userType: string;
  permissionsString: string;
  permissions: any = {};
  conditionVisible: boolean = true;

  constructor(private commonService: CommonService) {
    this.userType = this.commonService.GetLocalStorage('userType');

    if (this.userType === 'Sub User') {
      this.conditionVisible = false;
    }
  }
}

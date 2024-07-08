import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/shared/services/common.services';

@Component({
  selector: 'app-review-screen-setting-main',
  templateUrl: './review-screen-setting-main.component.html',
  styleUrls: ['./review-screen-setting-main.component.css']
})
export class ReviewScreenSettingMainComponent {
  shortName: string;
  nid: string;
  
  constructor(private commonService: CommonService, private route: ActivatedRoute) {
    this.commonService.$updateProfile.subscribe((value: any) => {
      if (value) {
        this.shortName = value.ShortName;
      }
    });
    this.nid = '';
  }


}

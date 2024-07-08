import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-review-screen-setting-header',
  templateUrl: './review-screen-setting-header.component.html',
  styleUrls: ['./review-screen-setting-header.component.css']
})
export class ReviewScreenSettingHeaderComponent {

  @Input() header: string;
  @Input() headerFontColor: string;
  @Input() headerBackgroundColor: string;

}

import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-platform-review-card',
  templateUrl: './platform-review-card.component.html',
  styleUrls: ['./platform-review-card.component.css'],
})
export class PlatformReviewCardComponent {
  @Input() data: any;

  @Input() selectedPlatformData: any;
  // @Input() selectItem: (id: number) => void;
  @Input() selectPlatform: any;
}

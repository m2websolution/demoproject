import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-review-rating-card',
  templateUrl: './review-rating-card.component.html',
  styleUrls: ['./review-rating-card.component.css'],
})
export class ReviewRatingCardComponent {
  @Input() data: any;
}

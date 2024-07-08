import { Component, Input, Output, EventEmitter } from '@angular/core';
export interface Star {
  value: number;
  checked: boolean;
  display: string;
}

export interface Rating {
  rating: number;
  votes: number;
  average: number;
}
@Component({
  selector: 'app-start-rating',
  templateUrl: './start-rating.component.html',
  styleUrls: ['./start-rating.component.css'],
})
export class StartRatingComponent {
  @Output() ratingChanged: EventEmitter<number> = new EventEmitter<number>();
  ratingObject: any;
  total = 0;
  @Input() starwidth: any;
  @Input() starType: any;
  @Input() start_orage_order: any;
  @Input() starClickable: boolean;
  @Input() id: any;

  stars: Star[] = [
    { value: 1, checked: false, display: 'Aweful' },
    { value: 2, checked: false, display: 'Poor' },
    { value: 3, checked: false, display: 'Average' },
    { value: 4, checked: false, display: 'Good' },
    { value: 5, checked: false, display: 'Excellent' },
  ];

  ngOnInit() {
    if (this.id) {
      this.stars.map((data: any) => {
        if (this.id.stars >= data.value) {
          data.checked = true;
        }
      });
    }
  }

  /**
   *
   * @param s Rating number
   * Function: updates/fills stars based on ratings
   */
  rate(s: Star) {
    // Set the rating value
    this.ratingChanged.emit(s.value);

    // Reset other stars
    this.stars.forEach(star => star.checked = star.value <= s.value);
  }
}

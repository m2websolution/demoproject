import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-my-review-ratings-card',
  templateUrl: './my-review-ratings-card.component.html',
  styleUrls: ['./my-review-ratings-card.component.css'],
})
export class MyReviewRatingsCardComponent {
  @Input() data: any;
  @Input() badgeData: any[];
  form: FormGroup;
  restaurant = "Chili's";

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      cleanliness: this.fb.control(null),
      quality: this.fb.control(2),
    });

    // confirm values
    this.form.valueChanges.subscribe((data) => {
    });
  }

  onSubmit() {
  }

  // example method to send the star component dynamic messaging
  public ratingMessage(ratingName: string) {
    let messages: any = {};
    messages['cleanliness'] = [
      `${this.restaurant} was gross!`,
      `${this.restaurant} was pretty bad.`,
      `${this.restaurant} was acceptable.`,
      `${this.restaurant} was pretty good.`,
      `${this.restaurant} was great!`,
    ];
    messages['quality'] = [
      `${this.restaurant} was unacceptable!`,
      `I couldn't eat the food at ${this.restaurant}.`,
      `${this.restaurant} food was acceptable.`,
      `${this.restaurant} was yummy.`,
      `${this.restaurant} is great!`,
    ];
    return messages[ratingName];
  }
}

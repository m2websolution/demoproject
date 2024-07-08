import { Component } from '@angular/core';

@Component({
  selector: 'app-update-sms',
  templateUrl: './update-sms.component.html',
  styleUrls: ['./update-sms.component.css']
})
export class UpdateSmsComponent {
  counter = 0;

  constructor() {}

  increment() {
    this.counter++;
  }

  decrement() {
    this.counter--;
  }
}

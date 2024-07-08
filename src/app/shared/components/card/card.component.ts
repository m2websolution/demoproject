import { Component, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent {
  constructor() {}
  selected?: boolean;
  @Input() data: any;
  @Input() selectedCard: any;
  // @Input() selectItem: (id: number) => void;
  @Input() selectItem: any;
  breakpoint: any;
  discriptionLendth=70;
  ngOnInit() {
    if (window.innerWidth > 700 && window.innerWidth < 1200) {

      this.breakpoint = 2;
    } else if (window.innerWidth > 1200) {
      this.breakpoint = 2;
      this.discriptionLendth = 80;

    } else {
      this.breakpoint = 1;
      this.discriptionLendth = 70;

    }
  }

  onResize(event: any) {
    if (window.innerWidth > 700 && window.innerWidth < 1200) {

      this.breakpoint = 2;
    } else if (window.innerWidth > 1200) {
      this.discriptionLendth = 80;

      this.breakpoint = 2;
    } else {
      this.breakpoint = 1;
      this.discriptionLendth = 70;
    }
  }
}

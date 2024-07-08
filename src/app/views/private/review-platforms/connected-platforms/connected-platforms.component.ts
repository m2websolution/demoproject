import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-connected-platforms',
  templateUrl: './connected-platforms.component.html',
  styleUrls: ['./connected-platforms.component.css'],
})
export class ConnectedPlatformsComponent {
  @Input() filteredConnectedData: any[];
  @Input() filteredCollectAndgetReviewsData: any[];
  @Input() filteredGetReviewsData: any[];
  @Input() searchQueryResult: string;
  breakpoint: any;
  connected: any;
  getconnected: any;
  collectCount: number = 4;
  getReviewsCount: number = 4;

  constructor(){
  }

  links = [
    { title: 'First', tabs: 'app' },
    { title: 'Second' },
    { title: 'Third' },
  ];

  activeLink = this.links[0];

  ngOnInit() {
    if (window.innerWidth > 600 && window.innerWidth < 1200) {
      this.breakpoint = 3;
    } else if (window.innerWidth > 1200) {
      this.breakpoint = 6;
    } else {
      this.breakpoint = 1;
    }
  }


  onResize(event: any) {
    if (window.innerWidth > 600 && window.innerWidth < 1200) {
      this.breakpoint = 3;
    } else if (window.innerWidth > 1200) {
      this.breakpoint = 6;
    } else {
      this.breakpoint = 1;
    }
  }

  /**
   * Function: Collapse cards of review platforms
   * @param num Numeric Value
   */
  viewLess(num: number): void {
    if (num === 0) {
      this.collectCount = 4;
    } else {
      this.getReviewsCount = 4;
    }
  }

  /**
   * Function: Expands cards of review platforms
   * @param num Numeric value
   */
  viewMore(num: number): void {
    if (num === 0) {
      if (this.collectCount < this.filteredCollectAndgetReviewsData.length) {
        this.collectCount = this.filteredCollectAndgetReviewsData.length;
      }
    } else {
      if (this.getReviewsCount < this.filteredGetReviewsData.length) {
        this.getReviewsCount = this.filteredGetReviewsData.length;
      }
    }
  }

}

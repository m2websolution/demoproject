import { Component, ElementRef, Inject, QueryList, ViewChild, ViewChildren, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-masonry-grid-modal',
  templateUrl: './masonry-grid-modal.component.html',
  styleUrls: ['./masonry-grid-modal.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class MasonryGridModalComponent {
  state: any = {
    fontColor: '#000000',
    backColor: '#ffffff',
    tab: '',
  };
  isDescriptionShowButton: boolean[];
  isDescriptionExpanded: boolean[]
  masonryData: any;
  isShowOverallRatingsBlock: boolean;
  isShowJsCodeBlock: boolean;
  @ViewChildren('descriptionElement') descriptionElements: QueryList<ElementRef>;
  descriptionElementHeights: number[];
  // Given any to dialogData as it has multiple types of data
  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any) {
    this.isShowOverallRatingsBlock = false;
    this.isShowJsCodeBlock = false;
    this.isDescriptionExpanded = [];
    this.isDescriptionShowButton = [];
    this.descriptionElementHeights = [];
  }

  ngAfterViewInit(): void {
    // Subscribe to changes in the QueryList
    this.descriptionElements.changes.subscribe(() => {
      // Check if the QueryList is empty or not
      if (this.descriptionElements && this.descriptionElements.length > 0) {
        // Elements are available, proceed to get heights
        this.getDescriptionElementHeights();
      }
    });
  }

  /**
   * Function: Gets description element height
   */
  getDescriptionElementHeights(): void {
    // Reset the array
    this.descriptionElementHeights = [];
    this.descriptionElements.forEach((elementRef: ElementRef) => {
      const height = elementRef.nativeElement.offsetHeight;
      this.descriptionElementHeights.push(height);
    });
  }

  changehandler(event: any) {
    this.state = {
      ...this.state,
      [event.target.id]: event.target.value,
    };
  }

  /**
   * Function: used to toggle read more/less button
   * @param index index number
   */
  toggleDescription(index: number): void {
    this.isDescriptionExpanded[index] = !this.isDescriptionExpanded[index];
  }

  onFieldValuesChanged(event: any) {
    this.state = event;
  }

  /**
   * Function: Fetches ReviewsForWidget response from child component
   * @param event ReviewsForWidget response
   */
  widgetDataChanged(event: any): void {
    this.masonryData = event;
  }

  /**
   * Function: Show/hide overall rating block
   * @param event boolean flag
   */
  showOverallRatings(event: boolean): void {
    this.isShowOverallRatingsBlock = event;
  }

  /**
   * Function: to show/hide other blocks when js code block is displayed
   * @param event Boolean flag
   */
  showJsBlock(event: boolean): void{
    this.isShowJsCodeBlock = event;
  }

  /**
   * Function: Checks whether rating is number or NaN
   * @param value rating
   * @returns boolean flag
   */
  isRatingNaN(value: string): boolean {
    return isNaN(parseFloat(value));
  }
}

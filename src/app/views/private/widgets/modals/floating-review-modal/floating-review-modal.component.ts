import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, Inject, OnInit, QueryList, Renderer2, ViewChild, ViewChildren, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-floating-review-modal',
  templateUrl: './floating-review-modal.component.html',
  styleUrls: ['./floating-review-modal.component.css'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('fadeIn', [
      state('visible', style({ opacity: 1 })),
      state('hidden', style({ opacity: 0 })),
      transition('hidden => visible', animate('3000ms')),
      transition('visible => hidden', animate('3000ms')),
    ]),
  ],
})
export class FloatingReviewModalComponent implements OnInit {
  state: any = {
    fontColor: '#000000',
    backColor: '#ffffff',
  };
  currentCardIndex: number;
  isDescriptionShowButton: boolean[];
  isDescriptionExpanded: boolean[];
  floatingReviewData: any;
  selectedWidgetPosition: string;
  @ViewChildren('descriptionElement') descriptionElements: QueryList<ElementRef>;
  @ViewChild('previewCardsContainer') previewCardsContainer: ElementRef;
  descriptionElementHeights: number[] = [];
  isShowJsCodeBlock: boolean;

  // Given any to dialogData as it has multiple types of data
  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any, private renderer: Renderer2) {
    this.currentCardIndex = 0;
    this.selectedWidgetPosition = '';
    this.isShowJsCodeBlock = false;
    this.isDescriptionExpanded = [];
    this.isDescriptionShowButton = [];
  }

  changehandler(event: any) {
    this.state = {
      ...this.state,
      [event.target.id]: event.target.value,
    };
  }

  ngOnInit() {
    this.selectedWidgetPosition = 'left';
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

  /**
   * Function: to show/hide other blocks when js code block is displayed
   * @param event Boolean flag
   */
  showJsBlock(event: boolean): void {
    this.isShowJsCodeBlock = event;
  }

  /**
   * Function: used to toggle read more/less button
   * @param index index number
   */
  toggleDescription(index: number): void {
    this.isDescriptionExpanded[index] = !this.isDescriptionExpanded[index];
    this.adjustContainerHeight(index);
  }

  /**
   * Adjust container height based on the card height
   * @param currentIndex current active index
   */
  adjustContainerHeight(currentIndex: number): void {
    setTimeout(() => { // Add a timeout to ensure the DOM has updated before calculating the height
      const container = this.previewCardsContainer.nativeElement;
      const children = container.children[currentIndex];
      const totalHeight = children.offsetHeight;
      this.renderer.setStyle(container, 'height', totalHeight + 'px');
    }, 100);
  }

  onFieldValuesChanged(event: any) {
    this.state = event;
  }

  /**
   * Function: Fetches ReviewsForWidget response from child component
   * @param event ReviewsForWidget response
   */
  widgetDataChanged(event: any):void {
    this.currentCardIndex = 0;
    this.floatingReviewData = event;
    const totalCards = this.floatingReviewData.Reviews.length;

    setInterval(() => {
      this.renderer.setStyle(this.previewCardsContainer.nativeElement, 'height', '280px');
      this.renderer.setStyle(this.previewCardsContainer.nativeElement, 'overflow', 'hidden');
      if (this.currentCardIndex === totalCards) {
        this.currentCardIndex = -1;
      }
      this.currentCardIndex++;
      clearInterval(this.currentCardIndex);
    }, 6000);
  }

  /**
   * Function: Gets cuurent widget position from dropdown
   * @param event widget position
   */
  getWidgetPosition(event: string) {
    if (this.selectedWidgetPosition !== event) {
      this.selectedWidgetPosition = event;
      this.currentCardIndex = -1; // Reset to start from the 1st index
    }
  }

}

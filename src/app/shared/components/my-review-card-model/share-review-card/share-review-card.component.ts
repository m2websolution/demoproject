import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import html2canvas from 'html2canvas';
import { CommonService } from 'src/app/shared/services/common.services';

@Component({
  selector: 'app-share-review-card',
  templateUrl: './share-review-card.component.html',
  styleUrls: ['./share-review-card.component.css'],
})
export class ShareReviewCardComponent {
  selctedColor = '#196cfa';
  colorCodes = [
   {colorCode:"#196cfa"},
   {colorCode:"#ED7374"},
   {colorCode:"#D4D4D8"},
   {colorCode:"#4ADE80"},
   {colorCode:"#FAA81A"}

  ];

  //dialogData: any Given any type as it contains message and data object both.
  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any, private commonService: CommonService){ }

  /**
   * Function: Downloads preview template into image format
   * @param reviewBy : Reviewer name
   */
  downloadAsImage(reviewBy: string): void {
    this.commonService.SpinnerObervable(true);
    const element = document.querySelector('.review-proviedeby-main-card') as HTMLElement;

    html2canvas(element, {
      backgroundColor: null, // Ensure transparency
      useCORS: true // Allow loading of external images
    }).then(canvas => {
      const link = document.createElement('a');
      link.href = canvas.toDataURL();
      link.download = reviewBy + '_Review.png';
      link.click();
      this.commonService.SpinnerObervable(false);
    });
  }

  onSelect(codes: any) {
    this.selctedColor = codes.colorCode;
  }
}

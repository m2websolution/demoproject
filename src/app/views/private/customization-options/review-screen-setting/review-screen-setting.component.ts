import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-review-screen-setting',
  templateUrl: './review-screen-setting.component.html',
  styleUrls: ['./review-screen-setting.component.css'],
})
export class ReviewScreenSettingComponent {
  connectedPlatformCount: number = 4;
  breakpoint: any;
  @Input() reviewScreen: any;
  starType: any;


  selectedItem: string = 'Item 1';
  cardPlatformData = [
    {
      title: 'Google',
      img: 'assets/svg/logos/google_icon.svg',
      isActive: 1,
    },

    {
      title: 'Yelp',
      img: 'assets/svg/logos/yelp_icon.svg',
      isActive: 0,
    },
    {
      title: 'Facebook',
      img: 'assets/svg/logos/facebook_icon.svg',
      isActive: 0,
    },
  ];
 
  screenSize?: any;
  



 

  ngOnInit() {
 
  }

  onResize(event: any) {
    
  }
}

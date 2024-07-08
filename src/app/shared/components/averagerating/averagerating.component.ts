import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-averagerating',
  templateUrl: './averagerating.component.html',
  styleUrls: ['./averagerating.component.css'],
})
export class AverageratingComponent {
  breakpoint: any;
  @Input() ratingModel:any;
  @Input() data:any[];

  constructor(){

  }
  rightData: any = [
    {
      icon: 'assets/svg/logos/google_icon.svg',
      text1: '192 → 244',
      text2: '(14)',
    },
    {
      icon: 'assets/svg/logos/facebook_icon.svg',
      text1: '45 → 59',
      text2: '(14)',
    },
    {
      icon: 'assets/svg/logos/alternativeto_icon.svg',
      text1: '16 → 42',
      text2: '(26)',
    },
    {
      icon: 'assets/svg/logos/airbnb_icon.svg',
      text1: '8 → 20',
      text2: '(12)',
    },
  ];

  ngOnInit() {
    if (window.innerWidth > 700 && window.innerWidth < 1200) {
      this.breakpoint = 2;
    } else if (window.innerWidth > 1200) {
      this.breakpoint = 2;
    } else {
      this.breakpoint = 1;
    }
   
  }

  onResize(event: any) {
    if (window.innerWidth > 700 && window.innerWidth < 1200) {
      this.breakpoint = 2;
    } else if (window.innerWidth > 1200) {
      this.breakpoint = 2;
    } else {
      this.breakpoint = 1;
    }
  }


}

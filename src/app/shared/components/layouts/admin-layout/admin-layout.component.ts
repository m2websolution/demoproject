import { Component, HostListener, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Breakpoints } from '@angular/cdk/layout';
import { LayoutService } from 'src/app/shared/services/layout.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
})
export class AdminLayoutComponent implements OnInit {
  drawer?: MatSidenav;
  isMobileView?: boolean;
  screenView?: 'sm' | 'md' | 'lg' = this.layoutService.screenSize;
  scroll = false;
  constructor(private layoutService: LayoutService) {
    if (document) {
    }
  }
  ngOnInit() {
    this.isMobileView = this.layoutService.isMobileView;
    this.layoutService.screenView.subscribe((value) => {
      value.breakpoints[Breakpoints.Medium]
        ? (this.screenView = 'md')
        : value.breakpoints[Breakpoints.Small] ||
          value.breakpoints[Breakpoints.HandsetPortrait]
        ? (this.screenView = 'sm')
        : (this.screenView = 'lg');

      this.isMobileView = this.screenView === 'sm' ? true : false;
      this.drawer?.toggle(this.isMobileView);
    });
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(e: any) {
    if (e) {
      this.scroll = true;
    }
  }
}

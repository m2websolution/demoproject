import { Injectable } from '@angular/core';
import {
  BreakpointObserver,
  BreakpointState,
  Breakpoints,
} from '@angular/cdk/layout';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  isMobileView?: boolean;
  screenSize?: 'sm' | 'md' | 'lg';
  screenView: Subject<BreakpointState> = new Subject<BreakpointState>();
  constructor(private responsive: BreakpointObserver) {
    this.screenView.subscribe((value) => {
      this.isMobileView = value.matches;
    });
    this.responsive
      .observe([
        Breakpoints.Small,
        Breakpoints.XSmall,
        Breakpoints.Medium,
        Breakpoints.Handset,
        Breakpoints.Large,
      ])
      .subscribe((res) => {
        this.isMobileView = res.matches;
        this.toggleSidebarVisibility(res);
        if (
          res.breakpoints[Breakpoints.Small] ||
          res.breakpoints[Breakpoints.HandsetPortrait]
        ) {
          this.screenSize = 'sm';
        } else if (res.breakpoints[Breakpoints.Medium]) {
          this.screenSize = 'md';
        } else {
          this.screenSize = 'lg';
        }
      });
  }

  toggleSidebarVisibility(state: BreakpointState) {
    this.screenView.next(state);
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css'],
})
export class BreadcrumbComponent {
  menuList: Array<any> = [];
  updatedRoues: any;
  constructor(public router: Router) {}

  // ngOnInit() {
  //   this?.menuList?.filter((item) => {
  //     if (`/layout/${item?.route}` == this.router.url) {
  //       this.updatedRoues = { item: item };
  //     } else if (item?.subMenu) {
  //       item?.subMenu.filter((items: any) => {
  //         if (`/layout/${items.route}` == this.router.url) {
  //           this.updatedRoues = { item, items };
  //         }
  //       });
  //     }
  //     console.log('updatedRoues', this.updatedRoues);
  //   });
  // }
}

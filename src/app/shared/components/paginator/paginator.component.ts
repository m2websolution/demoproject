import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css'],
})
export class PaginatorComponent implements OnInit {
  @Input() pager: any;
  @Input() selectedSortItem: number; // Set default value to 20
  sortList: any = [
    { value: 10, viewValue: '10' },
    { value: 20, viewValue: '20' },
    { value: 50, viewValue: '50' },
    { value: 100, viewValue: '100' },
  ];
  @Output() setPage = new EventEmitter<any>();
  @Output() setItems = new EventEmitter<any>();

  setPageNew(pager: any) {
    this.setPage.emit(pager);
  }

  onSelectedShort() {
    this.setItems.emit(this.selectedSortItem);
  }

  ngOnInit() {
    this.selectedSortItem = 20;
  }

  /**
   * Function: Gets current page size
   * @returns selected page size
   */
  getCurrentPageSize(): number {
    return this.selectedSortItem;
  }

  /**
   * Function: Gets current page number
   * @returns Current page number
   */
  getCurrentPageNumber(): number {
    return this.pager.currentPage;
  }
}

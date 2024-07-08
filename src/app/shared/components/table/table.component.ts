import { Component, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import { PagerService } from '../../services/pager.service';
import * as Papa from 'papaparse';

export interface PeriodicElement {
  srno: number;
  date: string;
  status: number;
}


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class TableComponent {
  @Input() data: any[];
  displayedColumns: string[] = ['srno', 'date', 'status', 'errorlog'];
  pages: number[] = [1, 2, 3, 4, 5];
  dataSource: any[];
  breakPoint: number = 6;
  pager: any = {};
  pagedItems: any;

  constructor(private pagerService: PagerService, private element: ElementRef) { }

  ngOnInit() {
    this.dataSource = this.data;
    if (window.innerWidth > 700 && window.innerWidth < 1200) {
      this.breakPoint = 2;
    } else if (window.innerWidth > 1200) {
      this.breakPoint = 4;
    } else {
      this.breakPoint = 1;
    }
    this.setPage(1);
  }

  ngOnChanges() {
    this.dataSource = this.data;
    this.setPage(1);
  }

  onResize(event: any) {
    if (window.innerWidth > 700 && window.innerWidth < 1200) {
      this.breakPoint = 2;
    } else if (window.innerWidth > 1200) {
      this.breakPoint = 4;
    } else {
      this.breakPoint = 1;
    }
  }

  setPage(page: number) {
    if (this.pager) {
      if (page < 1 || page > this.pager.totalPages) {
        return;
      }
    }

    this.pager = this.pagerService.getPager(
      this.dataSource.length,
      page,
      true,
      4
    );

    this.pagedItems = this.dataSource.slice(
      this.pager.startIndex,
      this.pager.endIndex + 1
    );
  }

  setItemsSorting(data: any) {
    this.pager = this.pagerService.getPager(
      this.dataSource.length,
      1,
      true,
      data
    );

    this.pagedItems = this.dataSource.slice(
      this.pager.startIndex,
      this.pager.endIndex + 1
    );
  }

  /**
   * Function: to convert errorlist object array to csv file.
   * @param errorList for details of error.
   */
  downloadErrorCSV(errorList: any[]): void {
    const dataArrayWithPlaceholder = errorList.map(obj => ({
      ...obj,
      Email: obj.Email === null ? ' ' : obj.Email,
      PhoneNumber: obj.PhoneNumber === null ? ' ' : obj.PhoneNumber,
      CountryCode: obj.CountryCode === null ? ' ' : obj.CountryCode,
    }));
    const csv = Papa.unparse(dataArrayWithPlaceholder);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'ErrorList.csv';
    link.click();
  }

  @Input() rowData: any;
  @Input() columnData: any;
}

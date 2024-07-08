import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PrivateServices } from 'src/app/services/PrivateServices';
import { AppConstant } from 'src/app/shared/constants';
import { ErrorHandlerService } from 'src/app/shared/services/ErrorHandler.service';
import { CommonService } from 'src/app/shared/services/common.services';
import { LayoutService } from 'src/app/shared/services/layout.service';
import { PagerService } from 'src/app/shared/services/pager.service';
import * as XLSX from 'xlsx';
import Chart, {
  ActiveElement,
  ArcElement,
  Plugin,
  ScriptableContext,
  Tooltip,
} from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
Chart.register(ChartDataLabels, ArcElement, Tooltip);

@Component({
  selector: 'app-qr-report',
  templateUrl: './qr-report.component.html',
  styleUrls: ['./qr-report.component.css', '../reports.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [DatePipe]
})
export class QrReportComponent implements OnInit {
  screenSize?: any;
  fromDate: Date;
  toDate: Date;
  key: string;
  profileId: string;
  qROverAllReport: any;
  employeeLeaderboardPageSize: number = 20;
  departmentLeaderboardPageSize: number = 20;
  employeeLeaderboardPager: any = {};
  departmentLeaderboardPager: any = {};
  dataSource1: any[];
  employeeLeaderBoard: any[];
  departmentLeaderBoard: any[]
  dataSource2: any[];
  leaderboardchart: any;
  stackedMainData = [
    {
      label: 'QR Arrived',
      borderColor: '#4ADE80',
      backgroundColor: '#4ADE80',
      categoryPercentage: 0.8,
      barPercentage: 0.7,
    },
    {
      label: 'Redirect To Review',
      borderColor: '#196CFA',
      backgroundColor: '#196CFA',
      categoryPercentage: 0.8,
      barPercentage: 0.7,
    },
    {
      grouped: true,
      label: 'Negative Feedback',
      borderColor: '#FAA81A',
      backgroundColor: '#FAA81A',
      categoryPercentage: 0.8,
      barPercentage: 0.7,
    },
  ];

  stackedbarData: any = {
    data: this.stackedMainData,
    aspectRatio: 5 / 2,
    scales: {
      x: {
        stacked: false,
        title: {
          display: true,
          text: 'Departments',
          color: '#18181B',
          font: {
            family: 'Manrope',
            size: 14,
            weight: 'bold',
          },
        },
      },
      y: {
        stacked: false,
        min: 0,
        title: {
          display: true,
          text: 'Counts',
          color: '#18181B',
          font: {
            family: 'Manrope',
            size: 14,
            weight: 'bold',
          },
        },
        ticks: {
          align: 'start',
          stepSize: 5,
        },
      },
    },
  };

  displayedColumns1: string[] = [
    'employeeName',
    'qrArrived',
    'redirectToReview',
    'privatefeedback',
  ];
  displayedColumns2: string[] = [
    'departmentName',
    'qrArrived',
    'redirectToReview',
    'positivefeedback',
    'privatefeedback',
  ];

  constructor(
    private layoutService: LayoutService,
    private pagerService: PagerService,
    private privateService: PrivateServices,
    private commonService: CommonService,
    private errorHandler: ErrorHandlerService,
    private datePipe: DatePipe
  ) {
    this.screenSize = this.layoutService.screenSize;
    this.key = this.commonService.GetLocalStorage(AppConstant.localStorage_Token);
    this.profileId = this.commonService.GetLocalStorage('profileId');
    this.fromDate = new Date(new Date().getFullYear(), new Date().getMonth() - 1, new Date().getDate());
    this.toDate = new Date();
    this.getQROverAllReport();
  }

  ngOnInit(): void {
  }

  /**
 * Function: Retrieves the overall QR report and updates leaderboards based on the selected date range.
 */
  getQROverAllReport(): void {
  
  }

  /**
 * Function: Handles the event when the date is changed and triggers the retrieval of the overall QR report.
 */
  dateChanged(event: any): void {
    this.getQROverAllReport();
  }

  /**
 * Function: Retrieves the leaderboard data and prepares it for display.
 */
  getLeaderboardData(): void {
    if (this.qROverAllReport?.DepartmentWiseQR?.length !== 0) {
      const departmentData = this.qROverAllReport?.DepartmentWiseQR?.map(item => ({
        qrArrived: item?.data?.qrArrived,
        redirectToReview: item?.data?.redirectToReview,
        negativeFeedback: item?.data?.privatefeedback
      }));

      this.stackedbarData.labels = this.qROverAllReport?.DepartmentWiseQR?.map(item => item?.Name);

      this.stackedMainData[0]['data'] = this.sortDescending(departmentData?.map(item => item?.qrArrived));
      this.stackedMainData[1]['data'] = this.sortDescending(departmentData?.map(item => item?.redirectToReview));
      this.stackedMainData[2]['data'] = this.sortDescending(departmentData?.map(item => item?.negativeFeedback));

      let data = [...this.stackedMainData[0]['data'], ...this.stackedMainData[1]['data'], ...this.stackedMainData[2]['data']];
      this.stackedbarData.scales.y.max = Math.max(...data);

    } else {
      this.stackedbarData.labels = [];
      this.stackedMainData[0]['data'] = [];
      this.stackedMainData[1]['data'] = [];
      this.stackedMainData[2]['data'] = [];
    }

    if (this.leaderboardchart) {
      this.leaderboardchart.destroy();
    }

    let id = "leaderboard";
    let stackData = this.stackedbarData;

    this.leaderboardchart = new Chart(id, {
      type: 'bar',
      data: {
        labels: stackData.labels,
        datasets: stackData.data,
      },
      options: {
        responsive: true,
        aspectRatio: 5 / 4,
        plugins: {
          datalabels: {
            display: false,
          },
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
            type: 'category',
            stacked: stackData.scales.x.stacked,
            ticks: {
              align: 'center',
              font: {
                size: 14,
              },
            },
            grid: {
              offset: true,
              display: false,
            },
            min: 0,
            offset: true,
            title: {
              ...stackData.scales.x.title,
              font: {
                family: 'Manrope',
                size: 14,
                weight: 'bold',
              },
            },
          },
          y: {
            stacked: stackData.scales.y.stacked,
            ticks: stackData.scales.y.ticks,
            grid: {
              display: true,
              color: '#FAFAFA',
            },
            beginAtZero: true,
            max: stackData.scales.y.max,
            min: stackData.scales.y.min,
            title: {
              ...stackData.scales.y.title,
              font: {
                family: 'Manrope',
                size: 14,
                weight: 'bold',
              },
            },
          },
        },
        elements: {
          bar: {
            borderRadius: 16,
          },
        },
      },
    });
  }

  /**
 * Function: exportLeaderboardData
 * Description: Exports leaderboard data to Excel file based on the type of leaderboard.
 * @param leaderboard - The type of leaderboard ("Department" or "Employee").
 * @returns void
 */
  exportLeaderboardData(leaderboard: string): void {
    if (leaderboard === "Department") {
      const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.dataSource2);
      const workbook: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Report Data');

      XLSX.writeFile(workbook, `Department_Leaderboard_Report.xlsx`);
    } else {
      const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.dataSource1);
      const workbook: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Report Data');

      XLSX.writeFile(workbook, `Employee_Leaderboard_Report.xlsx`);
    }
  }

  /**
 * Function: Checks if there is department-wise QR data available.
 * Returns: A boolean indicating whether department-wise QR data is available or not.
 */
  hasDepartmentWiseQRData(): boolean {
    if (this.qROverAllReport?.DepartmentWiseQR) {
      if (this.qROverAllReport?.DepartmentWiseQR.length !== 0) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  /**
 * Function: Sorts an array of numbers in descending order.
 * Parameters:
 *     - data: An array of numbers to be sorted.
 * Returns: 
 *     - An array of numbers sorted in descending order.
 */
  sortDescending(data: number[]): number[] {
    return data.sort((a, b) => b - a);
  }

  /**
 * Function: Sets the page for the employee leaderboard.
 * Parameters:
 *     - page: The page number to set.
 * Returns: 
 *     - None.
 */
  employeeLeaderboardSetPage(page: number) {
    if (this.employeeLeaderboardPager) {
      if (page < 1 || page > this.employeeLeaderboardPager.totalPages) {
        return;
      }
    }

    this.employeeLeaderboardPager = this.pagerService.getPager(
      this.employeeLeaderBoard.length,
      page,
      true,
      this.employeeLeaderboardPageSize
    );

    if (this.dataSource1) {
      this.dataSource1 = this.employeeLeaderBoard.slice(
        this.employeeLeaderboardPager.startIndex,
        this.employeeLeaderboardPager.endIndex + 1
      );
    }
  }

  /**
 * Function: Sets the sorting for the employee items.
 * Parameters:
 *     - data: The sorting data to set.
 * Returns: 
 *     - None.
 */
  employeeSetItemsSorting(data: any) {
    this.employeeLeaderboardPageSize = data;
    this.employeeLeaderboardPager = this.pagerService.getPager(
      this.employeeLeaderBoard.length,
      1,
      true,
      data
    );

    if (this.dataSource1) {
      this.dataSource1 = this.employeeLeaderBoard.slice(
        this.employeeLeaderboardPager.startIndex,
        this.employeeLeaderboardPager.endIndex + 1
      );
    }
  }

  /**
 * Function: Sets the page for the department leaderboard.
 * Parameters:
 *     - page: The page number to set.
 * Returns: 
 *     - None.
 */
  departmentLeaderboardSetPage(page: number) {
    if (this.departmentLeaderboardPager) {
      if (page < 1 || page > this.departmentLeaderboardPager.totalPages) {
        return;
      }
    }

    this.departmentLeaderboardPager = this.pagerService.getPager(
      this.departmentLeaderBoard.length,
      page,
      true,
      this.departmentLeaderboardPageSize
    );

    if (this.dataSource2) {
      this.dataSource2 = this.departmentLeaderBoard.slice(
        this.departmentLeaderboardPager.startIndex,
        this.departmentLeaderboardPager.endIndex + 1
      );
    }
  }

  /**
 * Function: Sets the sorting for the department items.
 * Parameters:
 *     - data: The sorting data to set.
 * Returns: 
 *     - None.
 */
  departmentSetItemsSorting(data: any) {
    this.departmentLeaderboardPageSize = data;
    this.departmentLeaderboardPager = this.pagerService.getPager(
      this.departmentLeaderBoard.length,
      1,
      true,
      data
    );

    if (this.dataSource1) {
      this.dataSource2 = this.departmentLeaderBoard.slice(
        this.departmentLeaderboardPager.startIndex,
        this.departmentLeaderboardPager.endIndex + 1
      );
    }
  }
}

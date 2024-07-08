import { F } from '@angular/cdk/keycodes';
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';

Chart.register(ChartDataLabels);
@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar.component.html',
  styleUrls: [],
  encapsulation: ViewEncapsulation.None,
})
export class BarChartComponent implements OnInit {
  // @Input() data:Array<{}>
  @Input() emailData: any[];
  public chart: any;
  ngOnInit() {
    this.createChart();
  }

  ngOnDestroy() {
    this.chart.destroy();
  }


  /**
    * Function: Function to create chart
    */
  createChart(): void {
    this.chart = new Chart('mybarchart', {
      type: 'line',
      data: {
        labels: [],
        datasets: [
          {
            datalabels: {
              display: false,
            },
            label: 'TotalClick',
            data: [],
            borderColor: '#FAA81A',
            backgroundColor: '#FAA81A',
          },
          {
            datalabels: {
              display: false,
            },
            label: 'TotalClickThrough',
            data: [],
            borderColor: '#4ADE80',
            backgroundColor: '#4ADE80',
          },
          {
            datalabels: {
              display: false,
            },
            label: 'TotalArrivedReviewPage',
            data: [],
            borderColor: '#FE3F34',
            backgroundColor: '#FE3F34',
          },
        ],
      },

      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
            position: 'right',
            align: 'center',
            labels: {
              boxHeight: 24,
              boxWidth: 24,
              pointStyle: 'circle',
              usePointStyle: true,
            },
          },
        },
      },
    });
  }
}

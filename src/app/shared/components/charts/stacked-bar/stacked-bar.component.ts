import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import Chart, { Plugin } from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { LayoutService } from 'src/app/shared/services/layout.service';

Chart.register(ChartDataLabels);
@Component({
  selector: 'app-stacked-bar',
  templateUrl: './stacked-bar.component.html',
  styleUrls: [],
  encapsulation: ViewEncapsulation.None,
})
export class StackedBarComponent implements OnInit {
  screenSize?: any;

  @Input() id: any;
  @Input() stackedbarData: any;

  constructor(private layoutService: LayoutService) {
    this.screenSize = this.layoutService.screenSize;
  }
  aspectRatio: number = 5 / 1.5;

  // @Input() data:Array<{}>
  public chart: any;
  ngOnInit() {
    // this.createChart();
  }

  fontSize: number = 14;
  borderRadius: number = 16;

  createChart() {
    if (this.chart) {
      this.chart.destroy();
    }

    let id = this.id;
    let stackData = this.stackedbarData;

    this.chart = new Chart(id, {
      type: 'bar',
      data: {
        labels: stackData.labels,
        datasets: stackData.data,
      },
      options: {
        responsive: true,
        aspectRatio: this.aspectRatio,
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
                size: this.fontSize,
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
                size: this.fontSize,
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
                size: this.fontSize,
                weight: 'bold',
              },
            },
          },
        },
        elements: {
          bar: {
            borderRadius: this.borderRadius,
          },
        },
      },
    });
  }

  ngAfterViewInit() {
    if (this.screenSize == 'sm') {
      this.aspectRatio = 5 / 4;
      this.fontSize = 10;
      this.borderRadius = 5;
    } else {
      this.aspectRatio = this.stackedbarData.aspectRatio;
    }
    this.createChart();
  }

  ngOnChanges() {
  }
}

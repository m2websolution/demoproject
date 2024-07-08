import { F } from '@angular/cdk/keycodes';
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import Chart, { Plugin } from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { LayoutService } from 'src/app/shared/services/layout.service';

Chart.register(ChartDataLabels);
@Component({
  selector: 'app-overall-bar',
  templateUrl: './overall-bar.component.html',
  styleUrls: [],
  encapsulation: ViewEncapsulation.None,
})
export class OverallBarComponent implements OnInit {
  // @Input() data:Array<{}>
  public chart: any;

  screenSize?: any;

  screenPadding: any = {
    top: 100,
    left: 20,
    right: 20,
  };
  barThickness: any = 70;
  titleText: any = {
    padding: 10,
    size: 16,
    weight: '500',
  };
  barBorderRadius: number = 16;
  aspectRatio: any = 5 / 1.8;

  toolTipPopup: any = {
    rectWidth: 180,
    rectHeight: 70,
    borderRadius: 10,
    font: 'bold 16px Manrope',
    xAxis: -90,
    yAxis: -90,
    dateText: {
      xPoint: 80,
      yPoint: 30,
    },
    revieCount: {
      xPoint: 85,
      yPoint: 50,
    },
  };

  screenWidth: any;

  constructor(private layoutService: LayoutService) {
    this.screenSize = this.layoutService.screenSize;
    this.screenWidth = window.innerWidth;
  }

  ngOnInit() {
    // this.createChart();
  }

  createChart() {
    const tooltipData = this.toolTipPopup;

    const plugins: Plugin<'bar'>[] = [
      {
        id: 'customTooltip',
        afterDraw(chart: any, args: any, options: any) {
          if (chart.tooltip?._active[0]) {
            const { ctx } = chart;

            ctx.save();
            const activePoint = chart.tooltip?._active[0];
            const dataPoint = activePoint?.index;
            const datasetIndex = activePoint?.datasetIndex;

            const numberText =
              chart.getDatasetMeta(datasetIndex)?.data[dataPoint]?.$context
                ?.raw;
            const dateText =
              chart.getDatasetMeta(datasetIndex)?.iScale?._labelItems[dataPoint]
                .label;

            const xPoint =
              chart
                .getDatasetMeta(datasetIndex)
                .data[dataPoint]?.tooltipPosition()?.x + tooltipData?.xAxis;
            const yPoint =
              chart
                .getDatasetMeta(datasetIndex)
                .data[dataPoint]?.tooltipPosition()?.y + tooltipData?.yAxis;

            ctx.lineWidth = 1;
            ctx.fillStyle = 'white';
            ctx.strokeStyle = '#2E33C7';

            const rectWidth = tooltipData?.rectWidth;
            const rectHeight = tooltipData?.rectHeight;
            const borderRadius = tooltipData?.borderRadius;

            // Draw rounded rectangle
            ctx.beginPath();
            ctx.moveTo(xPoint + borderRadius, yPoint);
            ctx.lineTo(xPoint + rectWidth - borderRadius, yPoint);
            ctx.arcTo(
              xPoint + rectWidth,
              yPoint,
              xPoint + rectWidth,
              yPoint + borderRadius,
              borderRadius
            );
            ctx.lineTo(xPoint + rectWidth, yPoint + rectHeight - borderRadius);
            ctx.arcTo(
              xPoint + rectWidth,
              yPoint + rectHeight,
              xPoint + rectWidth - borderRadius,
              yPoint + rectHeight,
              borderRadius
            );
            ctx.lineTo(xPoint + borderRadius, yPoint + rectHeight);
            ctx.arcTo(
              xPoint,
              yPoint + rectHeight,
              xPoint,
              yPoint + rectHeight - borderRadius,
              borderRadius
            );
            ctx.lineTo(xPoint, yPoint + borderRadius);
            ctx.arcTo(
              xPoint,
              yPoint,
              xPoint + borderRadius,
              yPoint,
              borderRadius
            );
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            ctx.font = tooltipData.font;
            ctx.fillStyle = '#2E33C7';
            ctx.textAlign = 'center';
            ctx.fillText(
              dateText,
              xPoint + tooltipData.dateText.xPoint,
              yPoint + tooltipData.dateText.yPoint
            );
            ctx.fillText(
              'Review Count:' + numberText,
              xPoint + tooltipData.revieCount.xPoint,
              yPoint + tooltipData.revieCount.yPoint
            );

            ctx.restore();
          }

          //   const activePoint = chart.tooltip._active[0];
        },
      },
    ];

    this.chart = new Chart(this.id, {
      type: 'bar',
      data: {
        labels: [
          '10 Feb',
          '11 Feb',
          '12 Feb',
          '13 Feb',
          '14 Feb',
          '15 Feb',
          '16 Feb',
          '17 Feb',
          '18 Feb',
        ],
        datasets: [
          {
            datalabels: {
              display: false,
            },
            barPercentage: 1,
            barThickness: this.barThickness,
            categoryPercentage: 1,
            // minBarLength: 2,
            data: [0.5, 0.5, 1.0, 0.1, 0.1, 0.3, 0.6, 0.05, 0.7],
            borderColor: '#FAA81A',
            backgroundColor: '#E4E4E7',
            hoverBackgroundColor: '#FAA81A',
            borderRadius: this.barBorderRadius,
          },
        ],
      },

      options: {
        responsive: true,
        aspectRatio: this.aspectRatio,
        layout: {
          padding: this.screenPadding,
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
          },
          y: {
            beginAtZero: true,
            grid: {
              display: true,
              color: '#FAFAFA',
            },
            ticks: {
              stepSize: 0.2,
            },
            title: {
              display: true,
              text: 'Counts',
              padding: this.titleText.padding,
              color: '#18181B',
              font: {
                family: 'Manrope',
                size: this.titleText.size,
                // weight: '500',
              },
            },
          },
        },
        plugins: {
          datalabels: {},

          legend: {
            display: false,
          },
          tooltip: {
            enabled: false,
          },
        },
      },
      plugins: [...plugins],
    });
  }

  ngAfterViewInit() {
    if (this.screenWidth < 1130) {
      this.screenPadding = {
        top: 65,
        left: 0,
        right: 0,
      };
      this.barThickness = 20;
      this.titleText = {
        padding: 0,
        size: 12,
        weight: '500',
      };
      this.toolTipPopup = {
        rectWidth: 120,
        rectHeight: 40,
        borderRadius: 10,
        font: 'bold 12px Manrope',
        xAxis: -60,
        yAxis: -60,
        dateText: {
          xPoint: 60,
          yPoint: 20,
        },
        revieCount: {
          xPoint: 60,
          yPoint: 33,
        },
      };
      this.barBorderRadius = 7;
      this.aspectRatio = 5 / 3;
      if (this.screenWidth < 600) {
        this.screenPadding = {
          top: 60,
          left: 0,
          right: 0,
        };

        this.aspectRatio = 4 / 4.5;
      }
      // if (this.screenWidth < 420) {
      //   this.screenPadding = {
      //     top: 0,
      //     left: 0,
      //     right: 0,
      //   };
      // }
    }

    this.createChart();
  }

  @Input() id: any;
}

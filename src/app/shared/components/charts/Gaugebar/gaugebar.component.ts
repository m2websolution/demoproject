import { Component, OnInit, Input } from '@angular/core';
import { Chart, Plugin, TooltipItem, TooltipModel } from 'chart.js';

import { _DeepPartialObject } from 'chart.js/dist/types/utils';

@Component({
  selector: 'app-gaugebar',
  templateUrl: './gaugebar.component.html',
})
export class GaugeBarComponent implements OnInit {
  public chart: any;
  needle: number;
  @Input() overAllSentiment: any;
  ngOnInit() {
    // this.createChart(7.5);
  }

  @Input() id: string = '';

  /**
  * Function: Api call to verify the otp.
  * @param needleValue, sentiment 
  * 
  */
  createChart(needleValue: number, sentiment: string): void {
    const GaugeNeedle: Plugin<'doughnut'>[] = [
      {
        id: 'needle',
        afterDatasetDraw(chart) {
          const {
            ctx,
            data,
            chartArea: { width, height },
          } = chart;
          ctx.save();
          const total = data.datasets[0].data.reduce((a, b) => {
            if (typeof a === 'number' && typeof b === 'number') {
              return a + b;
            } else {
              return 0;
            }
          }, 0);

          const metasets = chart.getDatasetMeta(0);
          const angle =
            Math.PI + (1 / parseInt(`${total}`)) * needleValue * Math.PI;
          const cx = width / 2;
          const cy = metasets.data[0].y;
          //needle
          ctx.translate(cx + 20, cy);
          ctx.rotate(angle);
          ctx.beginPath();
          ctx.moveTo(0, -8);
          ctx.lineTo(height - (height * 65) / 100, 0);
          ctx.lineTo(0, 8);
          ctx.fillStyle = '#000';
          ctx.fill();
          ctx.restore();
          //needle dot

          ctx.arc(cx + 20, cy, 8, 0, 10);
          ctx.fill();
          ctx.restore();

          ctx.font = '24px Manrope';
          ctx.fillStyle = '#000';
          ctx.fillText(`${sentiment}`, cx + 20, cy + 30);
          ctx.textAlign = 'center';
          ctx.restore();
        },
      },
      // {
      //   id: 'customTooltip',
      //   beforeDraw(chart: any, args: any, options: any) {
      //     const { data, ctx } = chart;
      //     var dataset = chart.getDatasetMeta(0);
      //     // var arc = chart.chartArea;
      //     // var centerX = arc.left + (arc.right - arc.left) / 2;
      //     // var centerY = arc.top + (arc.bottom - arc.top) / 2;
      //     // var radius =
      //     //   (Math.min(arc.right - arc.left, arc.bottom - arc.top) / 2) * 0.6;

      //     // ctx.lineWidth = 2;
      //     // ctx.strokeStyle = 'black';

      //     // for (var i = 0; i < dataset.data.length; i++) {
      //     //   var start = dataset.data[i].getCenterPoint();
      //     //   var end =
      //     //     dataset.data[(i + 1) % dataset.data.length].getCenterPoint();

      //     //   ctx.beginPath();
      //     //   ctx.moveTo(start.x, start.y);
      //     //   ctx.lineTo(end.x, end.y);
      //     //   ctx.stroke();
      //     // }

      //     ctx.restore();
      //   },
      // },
    ];

    this.chart = new Chart(this.id, {
      type: 'doughnut',
      data: {
        // values on X-Axis
        datasets: [
          {
            label: 'Sentiment Analysis',
            data: [2.5, 2.5, 2.5, 2.5],
            backgroundColor: [
              '#F95250',
              '#FAA81A',
              '#8DC92C',
              '#22C55E',
            ],
            hoverOffset: 0,
            borderWidth: 0,
            rotation: 270,

            circumference: 180,
          },
        ],
      },
      options: {
        layout: {
          padding: {
            left: 20,
            right: 20,
          },
        },
        plugins: {
          datalabels: {
            display: false,
            align: 'center',
            anchor: 'center',
            // offset: 0,
            // formatter: function (value, context) {
            //   var datasetIndex = context.datasetIndex;
            //   var index = context.dataIndex;
            //   var data = context.dataset.data;
            //   var startLabel = data[index];
            //   var endLabel = data[index + 1] || 0;

            //   return startLabel;
            // },
          },
          legend: {
            position: 'bottom',
            align: 'center',
            labels: {
              boxHeight: 24,
              boxWidth: 24,
              usePointStyle: true,
            },
          },
          tooltip: {
            yAlign: 'bottom',
            displayColors: false,
            callbacks: {
              label: function (
                this: TooltipModel<'doughnut'>,
                tooltipItem: TooltipItem<'doughnut'>
              ) {
                return `${needleValue}`;
              },
            },
          },
        },
        cutout: '80%',
      },
      plugins: [...GaugeNeedle],
    });
  }

  ngAfterViewInit() {
    if (this.overAllSentiment) {
      switch (this.overAllSentiment.Status) {
        case 'Excellent':
          this.needle = 8.75;
          break;
        case 'Bad':
          this.needle = 1.25;
          break;
        case 'Average':
          this.needle = 3.75;
          break;
        case 'Good':
          this.needle = 6.25;
          break;
        default:
          this.needle = 0;
          this.overAllSentiment.Status = 'Not available';
      }
      this.createChart(this.needle, this.overAllSentiment.Status);
    }

  }

  ngOnChanges() {
    if (this.overAllSentiment) {
      switch (this.overAllSentiment.Status) {
        case 'Excellent':
          this.needle = 8.75;
          break;
        case 'Bad':
          this.needle = 1.25;
          break;
        case 'Average':
          this.needle = 3.75;
          break;
        case 'Good':
          this.needle = 6.25;
          break;
        default:
          this.needle = 0;
          this.overAllSentiment.Status = 'Not available';
      }
      if (this.chart) {
        this.chart.destroy();
      }
      this.createChart(this.needle, this.overAllSentiment.Status);
    }
  }
}

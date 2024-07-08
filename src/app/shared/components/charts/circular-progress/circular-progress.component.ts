import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import Chart, {
  ArcElement,
  Plugin,
  ScriptableContext,
  Tooltip,
} from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { CommonService } from 'src/app/shared/services/common.services';
Chart.register(ChartDataLabels, ArcElement, Tooltip);

@Component({
  selector: 'app-circular-progress',
  templateUrl: './circular-progress.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['../charts.component.css'],
})
export class CircularProgressComponent implements OnInit {
  public chart: any;
  chartData: any;
  chartArray: Chart[];

  constructor(private commonService: CommonService) {
    this.chartArray = new Array<Chart>();
  }
  ngOnInit() {
  }

  ngAfterViewInit() {
    this.commonService.$emailValueSubject.subscribe((value: any) => {
      if (this.id === 'emailprogress') {
        this.data.total = value.EmailLimit;
        this.data.used = value.UsedEmail;
        if (value.EmailLimit && value.UsedEmail) {
          if ((value.EmailLimit - value.UsedEmail) <= 0) {
            this.data.activeColor = '#ff0000';
            this.data.remaining = 0;
          } else {
            this.data.remaining = (value.EmailLimit - value.UsedEmail);
          }
        }
      }
      else if (this.id === 'smsProgress') {
        this.data.total = value.SMSLimit;
        this.data.used = value.UsedSMS;
        if (value.SMSLimit && value.UsedSMS) {
          if ((value.SMSLimit - value.UsedSMS) <= 0) {
            this.data.activeColor = '#ff0000';
            this.data.remaining = 0;
          } else {
            this.data.remaining = (value.SMSLimit - value.UsedSMS);
          }
        }
      }
      var chartExist = Chart.getChart(this.id); // <canvas> id
      if (chartExist !== undefined){
        chartExist.destroy();
      }

      if (value.EmailLimit >= 0 && value.UsedEmail >= 0 && value.SMSLimit >= 0 && value.UsedSMS >= 0) {
        this.createChart();
      }
    });
  }

  createChart() {
    let chartData = this.data;
    let id = this.id;

    const plugins: Plugin<'doughnut'>[] = [
      {
        id: 'daughnutlabel',
        beforeDatasetDraw(chart) {
          const { ctx } = chart;
          const xCor = chart.getDatasetMeta(0).data[0].x;
          const yCor = chart.getDatasetMeta(0).data[0].y;
          ctx.font = 'bold 14px Manrope ';
          ctx.fillStyle = '#000000';

          ctx.fillText(chartData?.label, xCor, yCor);
          ctx.restore();
          ctx.font = 'bold 12px Manrope ';
          ctx.fillText(
            `${chartData?.used}/${chartData?.total}`,
            xCor,
            yCor + 15
          );
          ctx.textAlign = 'center';
          ctx.restore();
        },
      },
      // {
      //   id: 'roundArc',
      //   afterUpdate(chart) {
      //     if (chart.config.options.elements.arc. !== undefined) {
      //         var arc = chart.getDatasetMeta(0).data[chart.config.options.elements.arc.roundedCornersFor];
      //         arc.round = {
      //             x: (chart.chartArea.left + chart.chartArea.right) / 2,
      //             y: (chart.chartArea.top + chart.chartArea.bottom) / 2,
      //             radius: (chart.ctx.canvas. + chart.innerRadius) / 2,
      //             thickness: (chart.outerRadius - chart.innerRadius) / 2 - 1,
      //             backgroundColor: arc._model.backgroundColor
      //         }
      //     }
      //   },
      // },
    ];
    this.chart = new Chart(id, {
      type: 'doughnut',
      data: {
        datasets: [
          {
            label: chartData.data,
            data: [chartData.used, [chartData.remaining]],
            backgroundColor: [chartData.activeColor, '#F4F4F5'],
            spacing: 0,
            borderRadius: [50, 0],
            hoverOffset: 0,
            circular: true,
          },
        ],
      },
      options: {
        responsive: true,
        cutout: '75%',
        aspectRatio: 1,
        events: [],
        plugins: {
          datalabels: {
            display: false,
            color: 'white',
            formatter: (value) => {
              return value;
            },
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
        },
      },
      plugins: [...plugins],
    });
    this.chartArray.push(this.chart);
  }

  ngOnDestroy() {
    if (Chart.getChart('emailprogress') !== undefined) {
      Chart.getChart('emailprogress').destroy();
    }
    if (Chart.getChart('smsProgress') !== undefined) {
      Chart.getChart('smsProgress').destroy();
    }
  }

  @Input() data: any;
  @Input() id: string;
}

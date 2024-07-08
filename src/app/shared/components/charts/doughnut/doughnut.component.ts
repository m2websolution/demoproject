import { Component, OnInit, ViewEncapsulation, Input, SimpleChanges } from '@angular/core';
import Chart, {
  ArcElement,
  Plugin,
  ScriptableContext,
  Tooltip,
} from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { LayoutService } from 'src/app/shared/services/layout.service';
Chart.register(ChartDataLabels, ArcElement, Tooltip);

@Component({
  selector: 'app-doughnut',
  templateUrl: './doughnut.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['../charts.component.css', './doughnut.component.css'],
})
export class DoughnutComponent implements OnInit {
  public chart: any;
  screenSize: any;
  education_level: any;
  breakpoint: any;
  @Input() sentiment: any;
  percentage: number;

  upladtedList: any = [];
  degreeTitleList = [
    {
      label: 'Positive FeedBack ',
      value: 'Positive FeedBack - 30%',
    },
    {
      label: 'Negative FeedBack  ',
      value: 'Negative FeedBack - 20%',
    },
    {
      label: 'Mixed FeedBack',
      value: 'Mixed FeedBack - 50%',
    },
  ];

  analysisDataSet: Array<any> = [
    {
      label: 'Positive FeedBack - 30%',
      total: 11237,
      color: '#16A34A',
      to: 'rgba(22, 163, 74, 1)',
      from: 'rgba(92, 233, 144, 1)',
      values: [
        { label: 'Manager', data: 963 },
        { label: 'Person', data: 1356 },
        { label: 'Chef', data: 1245 },
        { label: 'People', data: 1142 },
        { label: 'Day', data: 1045 },
        { label: 'Manager', data: 963 },
        { label: 'Manager', data: 963 },
        { label: 'Expensive', data: 1100 },
      ],
    },
    {
      label: 'Negative FeedBack - 20%',
      total: 2907,
      color: '#F95250',
      to: 'rgba(249, 82, 80, 1)',
      from: 'rgba(255, 162, 160, 1)',
      values: [
        { label: 'Expensive', data: 794 },
        { label: 'Waiter', data: 1045 },
        { label: 'Long wait', data: 963 },
        { label: 'Cold', data: 852 },
        { label: 'Wait', data: 1045 },
      ],
    },
    {
      label: 'Mixed FeedBack - 50%',
      total: 16604,
      color: '#FAA81A',
      to: 'rgba(250, 168, 26, 1)',
      from: 'rgba(255, 255, 116, 1)',
      values: [
        { label: 'Experience', data: 2078 },
        { label: 'Room', data: 850 },
        { label: 'Staff', data: 741 },
        { label: 'Food', data: 621 },
        { label: 'Service', data: 1047 },
        { label: 'Experience', data: 2078 },
        { label: 'Room', data: 850 },
        { label: 'Staff', data: 741 },
        { label: 'Food', data: 621 },
        { label: 'Service', data: 512 },
      ],
    },
  ];

  educationLevelChangeAction(education: any) {
    this.education_level = education;
    let dropDownData = this.analysisDataSet.filter((data: any) => {
      if (data.label.split(' ')[0] === education.split(' ')[0]) {
        return data;
      }
    });

    this.upladtedList = dropDownData;
    console.log('dropDownData', this.upladtedList);
    //   this.degreeTitleList = dropDownData.values;
    //   if(this.degreeTitleList){

    //       this.analysisDataSet = this.degreeTitleList
    //   }

    // } else {
    //   this.degreeTitleList = [];
    // }
  }

  pSBCr: any = undefined;
  pSBC = (p: number, c0: string, c1: string, l: boolean) => {
    let r,
      g,
      b,
      P,
      f,
      t,
      h,
      i = parseInt,
      m = Math.round,
      a: any = typeof c1 == 'string';
    if (
      typeof p != 'number' ||
      p < -1 ||
      p > 1 ||
      typeof c0 != 'string' ||
      (c0[0] != 'r' && c0[0] != '#') ||
      (c1 && !a)
    )
      return null;
    if (!this.pSBCr)
      this.pSBCr = (d: any) => {
        let n = d.length,
          x: any = {};
        if (n > 9) {
          ([r, g, b, a] = d = d.split(',')), (n = d.length);
          if (n < 3 || n > 4) return null;
          (x.r = i(r[3] == 'a' ? r.slice(5) : r.slice(4))),
            (x.g = i(g)),
            (x.b = i(b)),
            (x.a = a ? parseFloat(a) : -1);
        } else {
          if (n == 8 || n == 6 || n < 4) return null;
          if (n < 6)
            d =
              '#' +
              d[1] +
              d[1] +
              d[2] +
              d[2] +
              d[3] +
              d[3] +
              (n > 4 ? d[4] + d[4] : '');
          d = i(d.slice(1), 16);
          if (n == 9 || n == 5)
            (x.r = (d >> 24) & 255),
              (x.g = (d >> 16) & 255),
              (x.b = (d >> 8) & 255),
              (x.a = m((d & 255) / 0.255) / 1000);
          else
            (x.r = d >> 16),
              (x.g = (d >> 8) & 255),
              (x.b = d & 255),
              (x.a = -1);
        }
        return x;
      };
    (h = c0.length > 9),
      (h = a ? (c1.length > 9 ? true : c1 == 'c' ? !h : false) : h),
      (f = this.pSBCr(c0)),
      (P = p < 0),
      (t =
        c1 && c1 != 'c'
          ? this.pSBCr(c1)
          : P
            ? { r: 0, g: 0, b: 0, a: -1 }
            : { r: 255, g: 255, b: 255, a: -1 }),
      (p = P ? p * -1 : p),
      (P = 1 - p);
    if (!f || !t) return null;
    if (l)
      (r = m(P * f.r + p * t.r)),
        (g = m(P * f.g + p * t.g)),
        (b = m(P * f.b + p * t.b));
    else
      (r = m((P * f.r ** 2 + p * t.r ** 2) ** 0.5)),
        (g = m((P * f.g ** 2 + p * t.g ** 2) ** 0.5)),
        (b = m((P * f.b ** 2 + p * t.b ** 2) ** 0.5));
    (a = f.a),
      (t = t.a),
      (f = a >= 0 || t >= 0),
      (a = f ? (a < 0 ? t : t < 0 ? a : a * P + t * p) : 0);
    if (h)
      return (
        'rgb' +
        (f ? 'a(' : '(') +
        r +
        ',' +
        g +
        ',' +
        b +
        (f ? ',' + m(a * 1000) / 1000 : '') +
        ')'
      );
    else
      return (
        '#' +
        (4294967296 + r * 16777216 + g * 65536 + b * 256 + (f ? m(a * 255) : 0))
          .toString(16)
          .slice(1, f ? undefined : -2)
      );
  };

  createBackgroundString(data: any, index: number) {
    return this.pSBC(index / data.values.length, data.to, data.from, true);
  }

  centerTitle: any = '24px Manrope';

  constructor(private layoutService: LayoutService) {
    // this.screenSize = this.layoutService.screenSize;
  }
  data: any = ['helo', 'hey there'];
  createChart() {
    var centerTitle = this.centerTitle;
    const plugins: Plugin<'doughnut'>[] = [
      {
        id: 'daughnutlabel',
        beforeDatasetDraw(chart) {
          const { ctx } = chart;
          const xCor = chart.getDatasetMeta(2).data[0].x;
          const yCor = chart.getDatasetMeta(2).data[0].y;
          ctx.font = centerTitle;
          ctx.fillStyle = '#000000';
          ctx.fillText('Sentiment', xCor, yCor);
          ctx.textAlign = 'center';
        },
      },
      {
        id: 'customLabels',
        afterDatasetDraw(chart, args, options) {
          const ctx = chart.ctx;
          const chartArea = chart.chartArea;
          const pluginOptions = options;

          ctx.save();
          ctx.font = 'Manrope';
          ctx.textBaseline = 'middle';

          const datasets = chart.data.datasets || [];
          datasets.forEach((dataset, datasetIndex) => {
            const meta = chart.getDatasetMeta(datasetIndex);
            meta.data.forEach((element, index) => {
              element;
              const startAngle = element.x;
              const endAngle = element.y;
              const innerRadius = element.getProps(['innerRadius']);
              const outerRadius = element.getProps(['outerRadius']);
              const x = (startAngle + endAngle) / 2;
              const y =
                (parseInt(`${innerRadius}`) + parseInt(`${outerRadius}`)) / 2;

              ctx.save();
              ctx.translate(
                chartArea.bottom + pluginOptions['xOffset'],
                chartArea.bottom + pluginOptions['yOffset']
              );
              ctx.rotate(x);

              const label = dataset.data?.[index]?.toString();

              ctx.fillStyle = pluginOptions['backgroundColor'];
              ctx.strokeStyle = pluginOptions['color'];
              ctx.lineWidth = 1;
              ctx.textAlign = pluginOptions['align'];
              ctx.textBaseline = 'middle';

              const textWidth = ctx.measureText(`${label}`).width;
              const textHeight = ctx.measureText('M').width;

              ctx.beginPath();
              ctx.rect(
                -textWidth / 2 - 4,
                y - textHeight / 2 - 2,
                textWidth + 8,
                textHeight + 4
              );
              ctx.fill();
              ctx.stroke();
              ctx.closePath();

              ctx.fillStyle = pluginOptions['color'];
              ctx.fillText(`${label}`, 0, y);
              ctx.restore();
            });
          });

          ctx.restore();
        },
      },
    ];

    this.chart = new Chart(this.id, {
      type: 'bar',
      data: {
        labels: ['Mixed Feedback', 'Positive Feedback', 'Negative Feedback'],

        datasets: [
          {
            label: 'Sentiment Analysis',
            data: [45567, 141267, 54467],
            backgroundColor: ['#F95250', '#F95250', '#22C55E'],
            borderRadius: 10,
          },
          {
            label: 'Sentiment Analysis',
            data: [45567, 141267, 54467],
            backgroundColor: ['#FAA81A', '#FAA81A', '#22C55E'],
            borderRadius: 10,
          },
          {
            label: 'Sentiment Analysis',
            data: [45567, 141267, 54467],
            backgroundColor: ['#F95250', '#FAA81A', '#22C55E'],
            borderRadius: 10,
          },
        ],
      },
      options: {
        // scales: {
        //   x: {
        //     stacked: false,
        //   },
        //   y: {
        //     stacked: true,
        //   },
        // },
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          datalabels: {
            display: true,
            color: 'white',
          },
          legend: {
            display: this.isLegend ?? true,
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
      // plugins: [...plugins],
    });
  }

  ngOnChanges() {
    if (this.sentiment) {
      this.analysisDataSet[0].label = "Positive";
      this.analysisDataSet[1].label = "Negative";
      this.analysisDataSet[2].label = "Mixed";
      this.analysisDataSet[0].total = this.sentiment.PositiveSentiments.Total_Review;
      this.analysisDataSet[1].total = this.sentiment.NegativeSentiments.Total_Review;
      this.analysisDataSet[2].total = this.sentiment.MixedSentiments.Total_Review;
      this.analysisDataSet[0].values = this.sentiment.PositiveSentiments.Sentiments_Words;
      this.analysisDataSet[1].values = this.sentiment.NegativeSentiments.Sentiments_Words;
      this.analysisDataSet[2].values = this.sentiment.MixedSentiments.Sentiments_Words;
      this.analysisDataSet[0]["sentimantes_percentage"] = `${this.sentiment.PositiveSentiments.sentimantes_percentage.toFixed(2)}%`;
      this.analysisDataSet[1]["sentimantes_percentage"] = `${this.sentiment.NegativeSentiments.sentimantes_percentage.toFixed(2)}%`;
      this.analysisDataSet[2]["sentimantes_percentage"] = `${this.sentiment.MixedSentiments.sentimantes_percentage.toFixed(2)}%`;

      if (window.innerWidth > 1200) {
        this.upladtedList = this.analysisDataSet;
      }
    }
  }

  ngAfterViewInit() {
    // if (this.screenSize == 'sm') {
    //   this.centerTitle = '16px Manrope';
    // }
    // this.createChart();
  }

  ngOnInit() {
    if (window.innerWidth > 1200) {
      this.breakpoint = 2;
      this.upladtedList = this.analysisDataSet;
    } else {
      this.breakpoint = 1;
      this.upladtedList = [this.analysisDataSet[0]];
      this.education_level = this.degreeTitleList[0].value;
    }
  }

  onResize(event: any) {
    if (window.innerWidth > 1200) {
      this.breakpoint = 2;
      this.upladtedList = this.analysisDataSet;
    } else {
      this.breakpoint = 1;
      this.education_level = this.degreeTitleList[0].value;
      this.upladtedList = [this.analysisDataSet[0]];
    }
  }

  @Input() id: any;
  @Input() isLegend: any;
}

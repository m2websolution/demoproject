import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
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
  selector: 'app-doughnut-platform',
  templateUrl: './doughnut-platform.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['../charts.component.css'],
})
export class DoughnutPlatformComponent implements OnInit {
  public chart: any;

  chartData: any;
  ngOnInit() {}

  createChart() {
    if (this.chart) {
      this.chart.destroy();
    }

    const canvas: any = document.getElementById(this.id);
    const ctx = canvas.getContext('2d');

    this.chart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: this.data.labels,
        datasets: [{
          data: this.data.data,
          backgroundColor: this.data.color,
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }

  ngAfterViewInit() {
    this.createChart();
  }
  @Input() data: any;
  @Input() id: any;
}

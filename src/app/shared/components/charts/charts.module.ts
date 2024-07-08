import { NgModule } from '@angular/core';
import { DoughnutComponent } from './doughnut/doughnut.component';
import { BarChartComponent } from './Bar/bar.component';

import { GaugeBarComponent } from './Gaugebar/gaugebar.component';
import { CircularProgressComponent } from './circular-progress/circular-progress.component';
import { DoughnutPlatformComponent } from './doughnut-platform/doughnut-platform.component';
import { OverallBarComponent } from './overall-bar/overall-bar.component';
import { StackedBarComponent } from './stacked-bar/stacked-bar.component';
import { CommonModule } from '@angular/common';
import { SharedMaterialModule } from '../../shared-material.module';

@NgModule({
  declarations: [
    DoughnutComponent,
    BarChartComponent,
    GaugeBarComponent,
    CircularProgressComponent,
    DoughnutPlatformComponent,
    OverallBarComponent,
    StackedBarComponent,
  ],
  imports: [CommonModule, SharedMaterialModule],
  exports: [
    DoughnutComponent,
    GaugeBarComponent,
    BarChartComponent,
    CircularProgressComponent,
    DoughnutPlatformComponent,
    OverallBarComponent,
    StackedBarComponent,
  ],
})
export class ChartModule {}

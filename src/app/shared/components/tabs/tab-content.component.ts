import {
  Component,
  ComponentFactoryResolver,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { TabContentHostDirective } from './tab-content-host.directive';

@Component({
  selector: 'shw-tab-content',
  template: '<ng-template tabContentHost></ng-template>',
  styleUrls: ['./tab.css'],
})
export class TabContentComponent implements OnInit {
  @ViewChild(TabContentHostDirective, { static: true })
  tabHost: any;

  @Input() tabConfig: any;

  constructor(private componentFactory: ComponentFactoryResolver) {}

  ngOnInit() {
    if (this.tabConfig) this.loadComponent();
  }

  loadComponent() {
    const componentFactory = this.componentFactory.resolveComponentFactory(
      this.tabConfig.component
    );

    const viewContainerRef = this.tabHost.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent(componentFactory);
    componentRef.instance.data = this.tabConfig.data;
  }
}

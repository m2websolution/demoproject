import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { ConnectedPlatformsComponent } from '../../../views/private/review-platforms/connected-platforms/connected-platforms.component';
import { Tab } from './tab';

export const TABS: Tab[] = [
  {
    title: 'All',
    component: ConnectedPlatformsComponent,
    closable: false,
    data: null,
  },
  {
    title: 'E-commerce',
    component: ConnectedPlatformsComponent,
    closable: true,
    data: null,
  },
  {
    title: 'Restaurants',
    component: ConnectedPlatformsComponent,
    closable: true,
    data: null,
  },
  {
    title: 'Hospitality',
    component: ConnectedPlatformsComponent,
    closable: true,
    data: null,
  },
  {
    title: 'Legal',
    component: ConnectedPlatformsComponent,
    closable: true,
    data: null,
  },
  {
    title: 'Healthcare',
    component: ConnectedPlatformsComponent,
    closable: true,
    data: null,
  },
  {
    title: 'Car Dealers',
    component: ConnectedPlatformsComponent,
    closable: true,
    data: null,
  },
  {
    title: 'Salons',
    component: ConnectedPlatformsComponent,
    closable: true,
    data: null,
  },
  
];

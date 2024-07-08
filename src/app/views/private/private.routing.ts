import { Routes } from '@angular/router';
import { LayoutsComponent } from 'src/app/shared/components/layouts/layouts.component';
import { DashboardComponent } from 'src/app/views/private/dashboard/dashboard.component';
import { MyReviewComponent } from './my-review/my-review.component';
import { ReviewPlatformsComponent } from './review-platforms/review-platforms.component';
import { InviteCustomerComponent } from './get-reviews/invite-customer/invite-customer.component';
import { BulkInviteComponent } from './get-reviews/bulk-invite/bulk-invite.component';
import { InvitedCustomerComponent } from './get-reviews/invited-customer/invited-customer.component';
import { EmailSettingsComponent } from './get-reviews/email-settings/email-settings.component';
import { TemplateSettingsComponent } from './get-reviews/template-settings/template-settings.component';
import { PrivateFeedbackComponent } from './private-feedback/private-feedback.component';
import { WebsiteWidgetsComponent } from './widgets/website-widgets/website-widgets.component';
import { SocialSharingComponent } from './widgets/social-sharing/social-sharing.component';
import { ReviewPageComponent } from './customization-options/review-page/review-page.component';
import { OptInPageComponent } from './customization-options/opt-in-page/opt-in-page.component';
import { QrCodeComponent } from './customization-options/qr-code/qr-code.component';
import { NotificationComponent } from './notification/notification.component';
import { CompanySettingsComponent } from './company-settings/company-settings.component';
import { IntegrationsComponent } from './integrations/integrations.component';
import { EmailWidgetsComponent } from './widgets/email-widgets/email-widgets.component';
import { SetupDomainComponent } from './general-setting/setup-domain/setup-domain.component';
import { BillingComponent } from './general-setting/billing/billing.component';
import { UsageComponent } from './general-setting/usage/usage.component';
import { UserComponent } from './general-setting/user/user.component';
import { CompanyProfilesComponent } from './general-setting/company-profiles/company-profiles.component';
import { MyAccountComponent } from './general-setting/my-account/my-account.component';
import { MyReportComponent } from 'src/app/views/private/reports/my-report/my-report.component';
import { PerformanceReportComponent } from './reports/performance-report/performance-report.component';
import { ReviewScreenSettingMainComponent } from './customization-options/review-screen-setting-main/review-screen-setting-main.component';
import { QrReportComponent } from './reports/qr-report/qr-report.component';
import { AccountDetailsComponent } from './account-details/account-details.component';
import { AdminLayoutComponent } from 'src/app/shared/Components/layouts/admin-layout/admin-layout.component';
import { IntegrationsDetailComponent } from './integrations-detail/integrations-detail.component';

import { IntegrationsJobberComponent } from './integrations/integrations-jobber/integrations-jobber.component';
import { QuickbooksComponent } from './integrations/quickbooks/quickbooks.component';
import { ViewAllListComponent } from './reports/view-all-list/view-all-list.component';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';


export const PrivateRouting: Routes = [
  { 
    path: '',
    redirectTo: 'dashboard', // Redirect to the dashboard if no child route is provided
    pathMatch: 'full'
  },
  {
    path: '',
    component: LayoutsComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'review-platforms',
        component: ReviewPlatformsComponent,
      },
      {
        path: 'get-review/invite-customer',
        component: InviteCustomerComponent,
      },
      {
        path: 'get-review/bulk-invite',
        component: BulkInviteComponent,
      },
      {
        path: 'get-review/invited-customers',
        component: InvitedCustomerComponent,
      },
      {
        path: 'get-review/email-settings',
        component: EmailSettingsComponent,
      },
      {
        path: 'get-review/template-settings',
        component: TemplateSettingsComponent,
      },
      {
        path: 'my-review',
        component: MyReviewComponent,
      },
      {
        path: 'private-feedback',
        component: PrivateFeedbackComponent,
      },

  {
    path: 'widgets/website-widgets',
    component: WebsiteWidgetsComponent,
  },
  {
    path: 'widgets/social-sharing',
    component: SocialSharingComponent,
  },
  {
    path: 'widgets/email-widgets',
    component: EmailWidgetsComponent,
  },
  {
    path: 'customization-options/review-page',
    component: ReviewPageComponent,
  },
  {
    path: 'customization-options/opt-in-page',
    component: OptInPageComponent,
  },
  {
    path: 'customization-options/qr-code',
    component: QrCodeComponent,
  },
  {
    path: 'customization-options/review-screen-setting-main',
    component: ReviewScreenSettingMainComponent,
  },

      {
        path: 'notification',
        component: NotificationComponent,
      },
      {
        path: 'company-setting',
        component: CompanySettingsComponent,
      },
      {
        path: 'integrations',
        component: IntegrationsComponent,
      },
      {
        path: 'general-setting/setup-domain',
        component: SetupDomainComponent,
      },
      {
        path: 'general-setting/billing',
        component: BillingComponent,
      },
      {
        path: 'general-setting/usage',
        component: UsageComponent,
      },
      {
        path: 'general-setting/user',
        component: UserComponent,
      },
      {
        path: 'general-setting/company-profiles',
        component: CompanyProfilesComponent,
      },
      {
        path: 'general-setting/my-account',
        component: MyAccountComponent,
      },
      {
        path: 'integrations/detail',
        component: IntegrationsDetailComponent,
      },
      {
        path: 'reports/my-report',
        component: MyReportComponent,
      },
      {
        path: 'reports/performance-report',
        component: PerformanceReportComponent,
      },
      {
        path: 'reports/qr-report',
        component: QrReportComponent,
      },
      {
        path: 'account-details',
        component: AccountDetailsComponent
      },
      {

        path: 'integrations/jobber',
        component: IntegrationsJobberComponent
      },
      {
        path: 'integrations/quickbooks',
        component: QuickbooksComponent
      },
      {

        path: "reports/view-all-list",
        component: ViewAllListComponent, 
      },
      {
        path: "header",
        component: HeaderComponent,
      }
    ],
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [],
  },
];

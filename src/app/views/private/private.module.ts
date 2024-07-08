import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';

import { SidebarComponent } from 'src/app/shared/components/sidebar/sidebar.component';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { CardComponent } from 'src/app/shared/components/card/card.component';
import { PlatformReviewCardComponent } from 'src/app/shared/components/platformReview/platform-review-card/platform-review-card.component';
import { ReviewRatingCardComponent } from 'src/app/shared/components/reviewrating/review-rating-card/review-rating-card.component';
import { RouterModule } from '@angular/router';
import { AverageratingComponent } from 'src/app/shared/components/averagerating/averagerating.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { LayoutsComponent } from 'src/app/shared/components/layouts/layouts.component';
import { ReviewPlatformsComponent } from './review-platforms/review-platforms.component';
import { InviteCustomerComponent } from './get-reviews/invite-customer/invite-customer.component';
import { BulkInviteComponent } from './get-reviews/bulk-invite/bulk-invite.component';
import { TableComponent } from 'src/app/shared/components/table/table.component';
import { InvitedCustomerComponent } from './get-reviews/invited-customer/invited-customer.component';
import { EmailSettingsComponent } from './get-reviews/email-settings/email-settings.component';
import { TemplateSettingsComponent } from './get-reviews/template-settings/template-settings.component';
import { GetReviewTemplateComponent } from 'src/app/shared/components/get-review-template/get-review-template.component';
import { TabContentHostDirective } from '../../shared/components/tabs/tab-content-host.directive';
import { TabContentComponent } from '../../shared/components/tabs/tab-content.component';
import { ConnectedPlatformsComponent } from './review-platforms/connected-platforms/connected-platforms.component';
import { DisConnectedPlatformModelComponent } from 'src/app/shared/components/dis-connected-platform-model/dis-connected-platform-model.component';
import { CollectPlatformModelComponent } from 'src/app/shared/components/collect-platform-model/collect-platform-model.component';
import { CustomLinkModelComponent } from 'src/app/shared/components/custom-link-model/custom-link-model.component';
import { MyReviewComponent } from './my-review/my-review.component';
import { FooterComponent } from 'src/app/shared/components/footer/footer.component';
import { MyReviewRatingsCardComponent } from 'src/app/shared/components/my-review-card-model/my-review-ratings-card/my-review-ratings-card.component';
import { MyReviewActivitiesFormComponent } from 'src/app/shared/components/my-review-card-model/my-review-activities-form/my-review-activities-form.component';
import { MyReviewProfileCardComponent } from 'src/app/shared/components/my-review-card-model/my-review-profile-card/my-review-profile-card.component';
import { AddManualReviewFormComponent } from 'src/app/shared/components/my-review-card-model/add-manual-review-form/add-manual-review-form.component';
import { SendManualReviewReplayFormComponent } from 'src/app/shared/components/my-review-card-model/send-manual-review-replay-form/send-manual-review-replay-form.component';
import { ShareReviewCardComponent } from 'src/app/shared/components/my-review-card-model/share-review-card/share-review-card.component';
import { PrivateFeedbackComponent } from './private-feedback/private-feedback.component';
import { EmailTemplateModalComponent } from 'src/app/shared/components/template-modals/email-template-modal/email-template-modal.component';
import { WebsiteWidgetsComponent } from './widgets/website-widgets/website-widgets.component';
import { SocialSharingComponent } from './widgets/social-sharing/social-sharing.component';
import { StartRatingComponent } from 'src/app/shared/components/start-rating/start-rating.component';
import { AlertsComponent } from 'src/app/shared/components/alerts/alerts.component';
import { ReviewCollectorModalComponent } from './widgets/modals/review-collector-modal/review-collector-modal.component';
import { ReviewPageComponent } from './customization-options/review-page/review-page.component';
import { OptInPageComponent } from './customization-options/opt-in-page/opt-in-page.component';
import { QrCodeComponent } from './customization-options/qr-code/qr-code.component';
import { HeaderOptionsComponent } from './customization-options/review-page/header-options/header-options.component';
import { PublicReviewWorkflowComponent } from './customization-options/review-page/public-review-workflow/public-review-workflow.component';
import { PrivateFeedbackWorkflowComponent } from './customization-options/review-page/private-feedback-workflow/private-feedback-workflow.component';
import { PrivateFeedbackFormComponent } from './customization-options/review-page/private-feedback-form/private-feedback-form.component';
import { LayoutOptionsComponent } from './customization-options/review-page/layout-options/layout-options.component';
import { ChartModule } from 'src/app/shared/components/charts/charts.module';
import { MasonryGridModalComponent } from './widgets/modals/masonry-grid-modal/masonry-grid-modal.component';
import { WidgetCustomizeComponent } from 'src/app/shared/components/widget-modal/widget-customize/widget-customize.component';
import { CarouselModalComponent } from './widgets/modals/carousel-modal/carousel-modal.component';
import { ReviewPageSettingsComponent } from './customization-options/review-page/review-page-settings/review-page-settings.component';
import { ReviewScreenSettingComponent } from './customization-options/review-screen-setting/review-screen-setting.component';
import { WebSolutionComponent } from './customization-options/modals/web-solution/web-solution.component';
import { AddManualReviewComponent } from './customization-options/modals/add-manual-review/add-manual-review.component';
import { EmployeeQrCodeComponent } from './customization-options/modals/employee-qr-code/employee-qr-code.component';
import { NotificationComponent } from './notification/notification.component';
import { CompanySettingsComponent } from './company-settings/company-settings.component';
import { IntegrationsComponent } from './integrations/integrations.component';
import { EmailWidgetsComponent } from './widgets/email-widgets/email-widgets.component';
import { ListViewModalComponent } from './widgets/modals/list-view-modal/list-view-modal.component';
import { FloatingReviewModalComponent } from './widgets/modals/floating-review-modal/floating-review-modal.component';
import { MicroReviewModalComponent } from './widgets/modals/micro-review-modal/micro-review-modal.component';
import { RatingReviewModalComponent } from './widgets/modals/rating-review-modal/rating-review-modal.component';
import { ReviewBadgesModalComponent } from './widgets/modals/review-badges-modal/review-badges-modal.component';
import { SmsTemplateComponent } from './get-reviews/sms-template/sms-template.component';
import { IntegrationsDetailComponent } from './integrations-detail/integrations-detail.component';
import { SetupDomainComponent } from './general-setting/setup-domain/setup-domain.component';
import { BillingComponent } from './general-setting/billing/billing.component';
import { UsageComponent } from './general-setting/usage/usage.component';
import { UserComponent } from './general-setting/user/user.component';
import { CompanyProfilesComponent } from './general-setting/company-profiles/company-profiles.component';
import { MyAccountComponent } from './general-setting/my-account/my-account.component';
import { CommonComponentModule } from 'src/app/shared/components/common-component.module';
import { PlatfomMobailWebComponent } from 'src/app/shared/components/platfom-mobail-web/platfom-mobail-web.component';
import { MyReportComponent } from './reports/my-report/my-report.component';
import { PerformanceReportComponent } from './reports/performance-report/performance-report.component';

import { QrReportComponent } from './reports/qr-report/qr-report.component';
import { MatIconModule } from '@angular/material/icon';

import { ReviewScreenSetting1Component } from './customization-options/review-screen-setting1/review-screen-setting1.component';
import { ReviewScreenSetting2Component } from './customization-options/review-screen-setting2/review-screen-setting2.component';
import { ReviewScreenSetting3Component } from './customization-options/review-screen-setting3/review-screen-setting3.component';
import { ReviewScreenSetting4Component } from './customization-options/review-screen-setting4/review-screen-setting4.component';
import { ReviewScreenSettingHeaderComponent } from './customization-options/review-screen-setting-header/review-screen-setting-header.component';
import { ReviewScreenSettingMainComponent } from './customization-options/review-screen-setting-main/review-screen-setting-main.component';
import { AdminLayoutComponent } from 'src/app/shared/Components/layouts/admin-layout/admin-layout.component';
import { AdministratorComponent } from './admin/administrator/administrator.component';
import { BrandingComponent } from './admin/admin-components/white-label-options/branding/branding.component';

import { BrandInformationComponent } from './admin/admin-components/white-label-options/branding/brand-information/brand-information.component';
import { DomainSetupComponent } from './admin/admin-components/white-label-options/domain-setup/domain-setup.component';
import { EmailDomainSetupComponent } from './admin/admin-components/white-label-options/email-domain-setup/email-domain-setup.component';
import { AdminUsersComponent } from './admin/admin-components/admin-users/admin-users.component';
import { UserDeleteModalComponent } from './admin/admin-components/admin-users/Modals/user-delete-modal/user-delete-modal.component';
import { UserEditModalComponent } from './admin/admin-components/admin-users/Modals/user-edit-modal/user-edit-modal.component';
import { AdminMyAccountComponent } from './admin/admin-components/admin-my-account/admin-my-account.component';
import { AdminChangePasswordComponent } from './admin/admin-components/admin-change-password/admin-change-password.component';
import { ComponyProfileComponent } from './admin/admin-components/compony-profile/compony-profile.component';
import { SetLimitComponent } from './admin/admin-components/compony-profile/set-limit/set-limit.component';
import { UsageAddonPurchaseComponent } from './admin/admin-components/usage-addon-purchase/usage-addon-purchase.component';
import { AdditionalEmailCreditsComponent } from './admin/admin-components/usage-addon-purchase/additional-email-credits/additional-email-credits.component';
import { BillingScreenComponent } from './admin/admin-components/billing-screen/billing-screen.component';
import { UpdateCardComponent } from './admin/admin-components/billing-screen/model/update-card/update-card.component';
import { CancelsubcriptionComponent } from './admin/admin-components/billing-screen/model/cancelsubcription/cancelsubcription.component';
import { SelectPlanScreenComponent } from './admin/admin-components/billing-screen/select-plan-screen/select-plan-screen.component';
import { PaymentdetailComponent } from './admin/admin-components/billing-screen/select-plan-screen/paymentdetail/paymentdetail.component';
import { UpdateSmsComponent } from './admin/admin-components/usage-addon-purchase/update-sms/update-sms.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { CdkDrag, CdkDragPreview, CdkDropList } from '@angular/cdk/drag-drop';

import { GoogleApiModule, NG_GAPI_CONFIG, NgGapiClientConfig } from 'ng-gapi';
import { AccountDetailsComponent } from './account-details/account-details.component';


import { QRCodeModule } from 'angularx-qrcode';
import { IntegrationsZapierComponent } from './integrations/integrations-zapier/integrations-zapier.component';
import { IntegrationsJobberComponent } from './integrations/integrations-jobber/integrations-jobber.component';

import { QuickbooksComponent } from './integrations/quickbooks/quickbooks.component';

import { ProfileUsageComponent } from './admin/admin-components/profile-usage/profile-usage.component';
import { UserPasswordModalComponent } from './admin/admin-components/admin-users/Modals/user-password-modal/user-password-modal.component';
import { ViewAllListComponent } from './reports/view-all-list/view-all-list.component';
import { TwilioIntegrationComponent } from './admin/admin-components/twilio-integration/twilio-integration.component';
import { PaymentStatusModalComponent } from './admin/admin-components/billing-screen/model/payment-status-modal/payment-status-modal.component';
import { CardUpdateConfirmationModelComponent } from './admin/admin-components/billing-screen/model/card-update-confirmation-model/card-update-confirmation-model.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [
    LayoutsComponent,
    AdminLayoutComponent,
    DashboardComponent,
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
    CompanySettingsComponent,
    OptInPageComponent,
    QrCodeComponent,
    ReviewPageComponent,
    InviteCustomerComponent,
    ReviewPlatformsComponent,
    BulkInviteComponent,
    InvitedCustomerComponent,
    EmailSettingsComponent,
    TemplateSettingsComponent,
    CardComponent,
    AlertsComponent,
    PlatformReviewCardComponent,
    ReviewRatingCardComponent,
    AverageratingComponent,
    TableComponent,
    GetReviewTemplateComponent,
    TabContentComponent,
    TabContentHostDirective,
    ConnectedPlatformsComponent,
    DisConnectedPlatformModelComponent,
    CollectPlatformModelComponent,
    CustomLinkModelComponent,
    MyReviewComponent,
    MyReviewRatingsCardComponent,
    MyReviewActivitiesFormComponent,
    MyReviewProfileCardComponent,
    AddManualReviewFormComponent,
    SendManualReviewReplayFormComponent,
    ShareReviewCardComponent,
    PrivateFeedbackComponent,
    EmailTemplateModalComponent,
    WebsiteWidgetsComponent,
    SocialSharingComponent,
    StartRatingComponent,
    ReviewCollectorModalComponent,
    HeaderOptionsComponent,
    PublicReviewWorkflowComponent,
    PrivateFeedbackWorkflowComponent,
    PrivateFeedbackFormComponent,
    LayoutOptionsComponent,
    MasonryGridModalComponent,
    WidgetCustomizeComponent,
    CarouselModalComponent,
    ListViewModalComponent,
    ReviewPageSettingsComponent,
    ReviewScreenSettingComponent,
    WebSolutionComponent,
    AddManualReviewComponent,
    EmployeeQrCodeComponent,
    FloatingReviewModalComponent,
    MicroReviewModalComponent,
    RatingReviewModalComponent,
    ReviewBadgesModalComponent,
    NotificationComponent,
    IntegrationsComponent,
    EmailWidgetsComponent,
    SmsTemplateComponent,
    IntegrationsDetailComponent,
    SetupDomainComponent,
    BillingComponent,
    UsageComponent,
    UserComponent,
    CompanyProfilesComponent,
    MyAccountComponent,
    MyReportComponent,
    PlatfomMobailWebComponent,
    PerformanceReportComponent,
    QrReportComponent,
    ReviewScreenSetting1Component,
    ReviewScreenSetting2Component,
    ReviewScreenSetting3Component,
    ReviewScreenSetting4Component,
    ReviewScreenSettingHeaderComponent,
    ReviewScreenSettingMainComponent,
    AdministratorComponent,
    BrandingComponent,
    BrandInformationComponent,
    DomainSetupComponent,
    EmailDomainSetupComponent,
    AdminUsersComponent,
    UserDeleteModalComponent,
    UserEditModalComponent,
    AdminMyAccountComponent,
    AdminChangePasswordComponent,
    ComponyProfileComponent,
    SetLimitComponent,
    UsageAddonPurchaseComponent,
    AdditionalEmailCreditsComponent,
    BillingScreenComponent,
    UpdateCardComponent,
    CancelsubcriptionComponent,
    SelectPlanScreenComponent,
    PaymentdetailComponent,
    UpdateSmsComponent,
    AccountDetailsComponent,

  
    QuickbooksComponent,

    ProfileUsageComponent,
    IntegrationsZapierComponent,
    IntegrationsJobberComponent,
    UserPasswordModalComponent,
    ViewAllListComponent,
    TwilioIntegrationComponent,
    PaymentStatusModalComponent,
    CardUpdateConfirmationModelComponent,

  ],
  imports: [
    CommonModule,
    CommonComponentModule,
    SharedModule,
    RouterModule,
    ChartModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatSliderModule,
    MatCardModule,
    MatRadioModule,
    CdkDropList,
    CdkDrag,
    CdkDragPreview,
    BrowserModule,
    BrowserAnimationsModule,

    QRCodeModule

  ],
  exports: [AccountDetailsComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PrivateModule {}

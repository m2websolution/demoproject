import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import {
  BrowserModule,
  REMOVE_STYLES_ON_COMPONENT_DESTROY,
} from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { PagerService } from './shared/services/pager.service';
import {
  APP_BASE_HREF,
  CommonModule,
  HashLocationStrategy,
  LocationStrategy,
} from '@angular/common';
import { PrivateRouting } from './views/private/private.routing';

import { CommonComponentModule } from './shared/components/common-component.module';
import {
  MAT_BOTTOM_SHEET_DATA,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { PrivateModule } from './views/private/private.module';
import { GYRServices } from './services/GYRServices';
import { PrivateServices } from './services/PrivateServices';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppHttpInterceptor } from './shared/services/AppHttpInterceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    BrowserModule,
    CommonComponentModule,
    SharedModule,
    PrivateModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    CKEditorModule,
    RouterModule.forRoot([
      ...PrivateRouting,
      { path: '**', redirectTo: '/auth/signin' },
    ]),
  ],

  providers: [
    PagerService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: GYRServices,
      multi: true
    },
    { provide: APP_BASE_HREF, useValue: '' },
    { provide: MatBottomSheetRef, useValue: {} },
    { provide: MAT_BOTTOM_SHEET_DATA, useValue: {} },
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: REMOVE_STYLES_ON_COMPONENT_DESTROY, useValue: true },
    GYRServices,PrivateServices,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppHttpInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}

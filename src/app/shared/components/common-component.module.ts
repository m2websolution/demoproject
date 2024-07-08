import { NgModule } from '@angular/core';
import { ConnectedPlatformsCardComponent } from './connected-platforms-card/connected-platforms-card.component';
import { CommonModule } from '@angular/common';
import { SharedMaterialModule } from '../shared-material.module';
import { PaginatorComponent } from './paginator/paginator.component';
import { AddNewCompanyProfileComponent } from './layouts/add-new-company-profile/add-new-company-profile.component';
import { ColorPickerFieldComponent } from './color-picker-field/color-picker-field.component';
import { ConfirmationModelComponent } from './confirmation-model/confirmation-model.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ConnectedPlatformsCardComponent,
    PaginatorComponent,
    AddNewCompanyProfileComponent,
    ColorPickerFieldComponent,
    ConfirmationModelComponent,
  ],
  imports: [CommonModule, SharedMaterialModule, ReactiveFormsModule],
  exports: [
    ConnectedPlatformsCardComponent,
    PaginatorComponent,
    AddNewCompanyProfileComponent,
    ColorPickerFieldComponent,
  ],
})
export class CommonComponentModule {}

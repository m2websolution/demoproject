import { Component, Input } from '@angular/core';
import { PrivateServices } from 'src/app/services/PrivateServices';
import { AppConstant } from 'src/app/shared/constants';
import { ErrorHandlerService } from 'src/app/shared/services/ErrorHandler.service';
import { CommonService } from 'src/app/shared/services/common.services';
import { CardUpdateConfirmationModelComponent } from '../../model/card-update-confirmation-model/card-update-confirmation-model.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UpdateCardComponent } from '../../model/update-card/update-card.component';
import { Router, UrlTree } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-paymentdetail',
  templateUrl: './paymentdetail.component.html',
  styleUrls: ['./paymentdetail.component.css'],
})
export class PaymentdetailComponent {
  @Input() tabIndex: any;
  @Input() plan: any;
  @Input() toggleValueStandard: boolean;
  @Input() planName: string;
  @Input() currentPlan: any;
  key: string;

  constructor(private privateService: PrivateServices,
    private errorHandler: ErrorHandlerService,
    private commonService: CommonService,
    private dialog: MatDialog,
    private router: Router,
    private location: Location) {
    this.key = this.commonService.GetLocalStorage(AppConstant.localStorage_Token);
  }

  radioOptions: number = 1;
  onRadioButtonChange(event: any) {
    this.radioOptions = event.value;
    console.log('event.value=' + event.value);
  }
  checked: boolean = false;
  ngOnInit() {
    this.radioOptions = 1;
  }

  /**
 * Function: handleSubscriptionClick
 * Description: Handles the subscription button click event by creating a checkout session.
 */
  handleSubscriptionClick() {
    let subscription = this.currentPlan ? this.currentPlan?.name === this.plan?.PlanName && this.currentPlan?.price === +(!this.toggleValueStandard ? this.plan?.Price
      : (((this.plan?.Price
      *
      12) - (((this.plan?.Price * 20 / 100) * 12))).toFixed(0))) ?
      "Already Subscribed"
      :
      (this.currentPlan?.price > +(!this.toggleValueStandard ? this.plan?.Price : (((this.plan?.Price * 12) - (((this.plan?.Price * 20 / 100) *
      12))).toFixed(0))) ? "Downgrade Subscription" : "Upgrade Subscription") : "Subscription"
      
    if (this.currentPlan) {
      const ref: MatDialogRef<CardUpdateConfirmationModelComponent> = this.dialog.open(
        CardUpdateConfirmationModelComponent,
        {
          width: '500px',
          height: '90vh',
          panelClass: 'custom-container',
          backdropClass: 'confirmDialogComponent',
          hasBackdrop: true,
          data: {
            message: subscription === 'Downgrade Subscription' ?  'Are you sure you want to Downgrade Subscription?' : "",
          },
        }
      );
      ref.afterClosed().subscribe(result => {
        if (result?.success) {
          this.updateSubscription();
        }
      });
    }
    else {
      let payload;
      if (this.planName === 'business') {
        payload = {
          PriceId: !this.toggleValueStandard ? this.plan?.plan?.monthly : this.plan?.plan?.yearly,
          Quantity: 1,
          Key: this.key
        }
      }
      else {
        payload = {
          PriceId: this.plan?.monthlyPlanId,
          Quantity: this.plan?.minProfile,
          Key: this.key
        }
      }

      
    }
  }

  /**
 * Function: updateSubscription
 * Description: Updates the user's subscription based on the selected plan and retrieved card token. This function assumes a `commonService` method exists to retrieve the card token from local storage.
 */
  updateSubscription() {
    const cardToken = this.commonService.GetLocalStorage("cardToken");
    const modal: any = {
      PlanId: this.planName === 'business' ? !this.toggleValueStandard ? this.plan?.plan?.monthly : this.plan?.plan?.yearly : this.plan?.monthlyPlanId,
      CardToken: cardToken ? JSON.parse(cardToken) : "",
      Key: this.key,
      CouponCode: ""
    }

    
  }
}

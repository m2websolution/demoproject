import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PrivateServices } from 'src/app/services/PrivateServices';
import { ErrorHandlerService } from 'src/app/shared/services/ErrorHandler.service';
import { CommonService } from 'src/app/shared/services/common.services';
import { CancelsubcriptionComponent } from '../cancelsubcription/cancelsubcription.component';
import { AppConstant } from 'src/app/shared/constants';
import { loadStripe } from '@stripe/stripe-js/pure';


@Component({
  selector: 'app-card-update-confirmation-model',
  templateUrl: './card-update-confirmation-model.component.html',
  styleUrls: ['./card-update-confirmation-model.component.css']
})
export class CardUpdateConfirmationModelComponent implements OnInit {
  key: string;
  cardDetails: any;
  selectedOption: string = "new";
  cardNumberObj: any;
  stripeObj: any;
  cardExpiryDateObj: any;
  cardCvvObj: any;
  invalidCard: boolean = false;
  termsAccepted: boolean = false;

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any,
    private privateService: PrivateServices,
    private commonService: CommonService,
    private dialogRef: MatDialogRef<CancelsubcriptionComponent>,
    private errorHandler: ErrorHandlerService) {
    this.key = this.commonService.GetLocalStorage(AppConstant.localStorage_Token);
    if (this.dialogData.message !== 'Are you sure you want to Downgrade Subscription?') {
      this.getCardDetails();
    }
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.loadSt()
    }, 1000)
  }

  /**
 * Loads Stripe elements and initializes card elements.
 */
  async loadSt() {
    this.stripeObj = await loadStripe("pk_test_PtpfU5Nk2DYlqYbatPBW9u3K0088067hve");
    let elements = this.stripeObj.elements();
    let style = {
      base: {
        color: '#32325d',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#aab7c4'
        }
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a'
      }
    };
    // Create an instance of the card Element.
    this.cardNumberObj = elements.create('cardNumber', { iconStyle: "solid", showIcon: true, hidePostalCode: true, style: style });
    this.cardExpiryDateObj = elements.create('cardExpiry', { style: style });
    this.cardCvvObj = elements.create('cardCvc', { style: style });
    // Add an instance of the card Element into the `card-element` <div>.
    this.cardNumberObj.mount('#cardNumber');
    this.cardExpiryDateObj.mount('#cardExpiryDate');
    this.cardCvvObj.mount('#cardCvv');
  }

  onConfirmUpdateCard() {
    this.dialogRef.close({ success: true, message: 'Card details have been successfully updated.' });
  }


  setSelectedOption(option: string) {
    this.selectedOption = option;
  }


  /**
  * Function: getCardDetails
  * Description: Retrieves card details from a service and handles the response.
  */
  getCardDetails() {
    this.commonService.SpinnerObervable(true);
    
  }

  /**
 * Submits the payment form.
 */
  submitForm() {
    this.stripeObj.createToken(this.cardNumberObj, this.cardExpiryDateObj, this.cardCvvObj).then((result) => {
      if (result.error) {
        // Inform the user if there was an error.
        this.invalidCard = true;
      } else {
        // Send the token to your server.
        this.stripeTokenHandler(result.token);
      }
    }).catch((error) => {
      this.invalidCard = true;
      console.error("Token creation failed", error);
    });
  }

  /**
 * Handles the Stripe token.
 * @param token The token received from Stripe.
 */
  stripeTokenHandler(token) {
    if (token.id != undefined) {
      if (token.card != undefined) {
        if (token.card.brand.toLocaleLowerCase() == 'visa' || token.card.brand.toLocaleLowerCase() == "mastercard" || token.card.brand.toLocaleLowerCase() == "american express") {
          this.commonService.AddLocalStorage('cardToken', JSON.stringify(token.id));
          this.dialogRef.close({ success: true });
          this.invalidCard = false;
        } else {
          this.invalidCard = true;
          return
        }
      } else {
        this.invalidCard = true;
        return
      }
    } else {
      this.invalidCard = true;
      return
    }
  }

  /**
 * Closes the dialog.
 */
  close() {
    this.dialogRef.close();
  }

  /**
 * Submits the form.
 * If the selected option is 'existing', closes the dialog with success.
 * Otherwise, submits the form.
 */
  submit() {
    if (this.selectedOption === 'existing') {
      this.dialogRef.close({ success: true });
    } else {
      this.submitForm();
    }
  }
}

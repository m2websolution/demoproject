import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { CommonService } from 'src/app/shared/services/common.services';
import { loadStripe } from '@stripe/stripe-js/pure';
import { AppConstant } from 'src/app/shared/constants';
import { PrivateServices } from 'src/app/services/PrivateServices';
import { ErrorHandlerService } from 'src/app/shared/services/ErrorHandler.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-update-card',
  templateUrl: './update-card.component.html',
  styleUrls: ['./update-card.component.css'],
})
export class UpdateCardComponent implements OnInit {
  accountCountry: string;
  stripeObj: any;
  cardNumberObj: any;
  cardExpiryDateObj: any;
  cardCvvObj: any;
  invalidCard: boolean = false;
  key: string;
  formSubmitted:boolean=false;

  constructor(private commonService: CommonService,
    private privateService: PrivateServices,
    private errorHandler: ErrorHandlerService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<UpdateCardComponent>,
    public cdr: ChangeDetectorRef
  ) {
    this.accountCountry = this.commonService.GetLocalStorage("Country");
    this.key = this.commonService.GetLocalStorage(AppConstant.localStorage_Token);
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
        if (token.card.brand.toLocaleLowerCase() == 'visa' || token.card.brand.toLocaleLowerCase() == "mastercard" || token.card.brand.toLocaleLowerCase() == "american express" ) {
          this.callUpdateCard(token.id);
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
 * Calls the update card API.
 * @param token The token received from Stripe.
 */
  callUpdateCard(token) {
    let data = {
      Token: token,
      Key: this.key,
    }

    this.formSubmitted = true;
      
  }
}

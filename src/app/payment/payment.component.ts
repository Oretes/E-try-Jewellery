import { Component, OnInit , NgZone} from '@angular/core';
import { ICustomWindow,PaymentServiceService } from '../services/payment-service.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
 private _window: ICustomWindow;
  public rzp: any;
  user = '1';

  public options: any = {
    key: 'rzp_test_1qTJAPCGDfvSSN', // add razorpay key here
    name: 'E-try Jewllery',
    description: 'SUBSCRIPTION',
    amount: 1000, // razorpay takes amount in paisa
    prefill: {
      name: '',
      email: '', // add your email id
    },
    notes: {},
    theme: {
      color: '#3880FF'
    },
    handler: this.paymentHandler.bind(this),
    modal: {
      ondismiss: (() => {
        this.zone.run(() => {
          // add current page routing if payment fails
        })
      })
    }
  };

  constructor(
    private zone: NgZone,
    public winRef:PaymentServiceService,
    private router:Router
  ) {
    this._window = this.winRef.nativeWindow;
  }

  initPay(): void {
    this.rzp = new this.winRef.nativeWindow['Razorpay'](this.options);
    this.rzp.open();

  }


  paymentHandler(res: any) {
    // this.zone.run(() => {
      // add API call here
      alert("Thank You!! You are Subscribed for 1 day.");
      return this.router.navigate(["/home"]);


  }

  ngOnInit(){
    localStorage.setItem('SeesionUser',this.user)
  }
}








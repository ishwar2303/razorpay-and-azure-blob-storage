import { HostListener, Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OrderService } from './services/order.service';

declare var Razorpay: any

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  // @ts-ignore
  paymentForm: FormGroup

  // @ts-ignore
  paymentId: string;

  // @ts-ignore
  error: string;

  options = {
    "key": "rzp_test_tpOc2nb7SL0Psb",
    "amount": "", 
    "name": "Payment Testing",
    "description": "Testing Demo",
    "image": "https://www.javachinna.com/wp-content/uploads/2020/02/android-chrome-512x512-1.png",
    "order_id":"",
    "handler": function (response: any){
        var event = new CustomEvent("payment.success", 
            {
                detail: response,
                bubbles: true,
                cancelable: true
            }
        );    
        window.dispatchEvent(event);
    }
    ,
    "prefill": {
    "name": "",
    "email": "",
    "contact": ""
    },
    "notes": {
    "address": ""
    },
    "theme": {
    "color": "#3399cc"
    }
    };

  constructor(private formBuilder: FormBuilder, private orderService: OrderService) {}

  ngOnInit() {
    this.paymentForm = this.formBuilder.group({
      customerName: ['',[Validators.required]],
      email: ['', [Validators.required]],
      contact: ['', [Validators.required]],
      totalAmount: ['', [Validators.required]],
      receiptNumber: ['', [Validators.required]],
      address: ['', [Validators.required]]
    })

  }

  submit(): void {
    console.log(this.paymentForm.value)

    this.orderService.createOrder(this.paymentForm.value).subscribe((res) => {
      console.log(res)

      // this.options.key = res.secretKey;
      this.options.key = "rzp_test_tpOc2nb7SL0Psb";
      this.options.order_id = res.orderId;
      this.options.amount = res.customerDetails.totalAmount; // paise
      this.options.prefill.name = res.customerDetails.customerName;
      this.options.prefill.email = res.customerDetails.email;
      this.options.prefill.contact = res.customerDetails.contact;

      // open payment gateway
      var rzp1 = new Razorpay(this.options);
      rzp1.open();
                 
      rzp1.on('payment.failed', (response: any) => {    
          // Todo - store this information in the server
          console.log(response.error.code);    
          console.log(response.error.description);    
          console.log(response.error.source);    
          console.log(response.error.step);    
          console.log(response.error.reason);    
          console.log(response.error.metadata.order_id);    
          console.log(response.error.metadata.payment_id);
          this.error = response.error.reason;
      });
    }, (err) => {
      console.log(err)
    })
  }

  @HostListener('window:payment.success', ['$event']) 
  onPaymentSuccess(event: any): void {
    console.log(event.detail)
      // this.orderService.updateOrder(event.detail).subscribe(
      // data => {
      //     this.paymentId = data.message;
      // }
      // ,
      // err => {
      //     this.error = err.error.message;
      // }
      // );
  }

  fetchSession(): void {
    this.orderService.fetchSession().subscribe((res) => {
      console.log(res)
      console.log(res.headers)
    }, (err) => {
      console.log(err)
    })
  }

  fetchNames(): void {
    this.orderService.fetchNames().subscribe((res) => {
      console.log(res)
      console.log(res.headers)
      console.log(res.headers.keys())
    }, (err) => {
      console.log(err)
    })
  }
}

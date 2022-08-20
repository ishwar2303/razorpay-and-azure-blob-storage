import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, catchError } from 'rxjs';
import { PaymentDetails } from '../models/payment-details';
 
const httpOptions = {
headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
declare var Razorpay: any;
 
@Injectable({
providedIn: 'root'
})
export class OrderService {
 
    baseURL: string = 'http://localhost:5000/api/Payment/'

    httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Cookie': '.AspNetCore.Session=CfDJ8FPGVsYdKwREvyDGUseTk3xnryrwvajUy2VoXy%2FZG2MsMB3o4i%2BWLKYfiPU5UqXtsn8rn%2BuSpin2uewiF%2FSdXGy59cOD7KWBCzdEhHRlaCYPRC8js3sWBWJi3vT9PKpw%2FvSTNBMAvlwy30y59O05rkOpbKxB5QATMqq3kujRIRLa; path=/; samesite=lax; httponly'
      }),
      withCredentials : true
    }


    constructor(private http: HttpClient) {
 
    }
   
    createOrder(order: PaymentDetails): Observable<any> {
        return this.http.post<PaymentDetails>(this.baseURL + 'Order/Create', order, httpOptions);
    }
   
    updateOrder(order: any): Observable<any> {
        return this.http.put(this.baseURL + 'Order/Create', {
        razorpayOrderId: order.razorpay_order_id,
        razorpayPaymentId: order.razorpay_payment_id,
        razorpaySignature: order.razorpay_signature
        }, httpOptions);
    }

    fetchNames(): Observable<any> {
      return this.http.get('http://localhost:5000/api/home/names', { observe: "response" }).pipe(catchError(this.handleError));
    }

    fetchSession(): Observable<any> {
      return this.http.get('http://localhost:5000/api/home/session', this.httpOptions).pipe(catchError(this.handleError));
    }


    handleError(err:HttpErrorResponse){
      return throwError(err)
    }
}
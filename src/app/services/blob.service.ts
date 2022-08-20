import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, catchError } from 'rxjs';
import { PaymentDetails } from '../models/payment-details';
import { Blob } from '../models/blob';
 
const httpOptions = {
headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
declare var Razorpay: any;
 
@Injectable({
providedIn: 'root'
})
export class BlobService {
 
    baseURL: string = 'http://localhost:5000/api/AzureBlobDemo/'

    httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }


    constructor(private http: HttpClient) {
 
    }
   
   
    upload(file: File): Observable<Object> {
      const formData: FormData = new FormData();
      formData.append('ImageToUpload', file, file.name);
      console.log(formData)
      return this.http.post(this.baseURL + 'UploadFile', formData);
    }

    getBlobs(): Observable<any> {
      return this.http.get(this.baseURL + 'ViewBlobs').pipe(catchError(this.handleError))
    }

    deleteBlob(blob: Blob): Observable<any> {
      return this.http.post<Blob>(this.baseURL + 'DeleteBlob', blob, this.httpOptions).pipe(catchError(this.handleError))
    }

    handleError(err:HttpErrorResponse){
      return throwError(err)
    }
}
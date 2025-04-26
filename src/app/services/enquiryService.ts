// src/app/services/enquiry.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Enquiry } from '../models/enquiry';


@Injectable({
  providedIn: 'root'
})
export class EnquiryService {
  private apiUrl = 'http://localhost:3000/api/enquiries'; // Update with your backend URL

  constructor(private http: HttpClient) { }

    getEnquirys(): Observable<Enquiry[]> {
    return this.http.get<Enquiry[]>(this.apiUrl);
  }

  submitEnquiry(enquiry: Enquiry): Observable<any> {
    return this.http.post(this.apiUrl, enquiry);
  }
}


// client/src/app/services/enquiry.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Enquiry } from '../models/enquiry';

@Injectable({
  providedIn: 'root'
})
export class EnquiryService {
  searchEnquirys(searchQuery: string) {
    throw new Error('Method not implemented.');
  }
  private apiUrl = 'http://localhost:3000/api/enquiries';

  constructor(private http: HttpClient) { }

  // Submit a new enquiry
  createEnquiry(enquiry: Enquiry): Observable<Enquiry> {
    return this.http.post<Enquiry>(this.apiUrl, enquiry);
  }

  // Get all enquirys
  getEnquirys(): Observable<Enquiry[]> {
    return this.http.get<Enquiry[]>(this.apiUrl);
  }
}


import { Injectable } from '@angular/core';
import { Enquiry } from '../models/enquiry';

@Injectable({
  providedIn: 'root'
})
export class EnquiryService {
  private enquiries: Enquiry[] = [];

  addEnquiry(enquiry: Enquiry): void {
    this.enquiries.push(enquiry);
    console.log('Enquiry stored:', enquiry);
  }

  getEnquiries(): Enquiry[] {
    return this.enquiries;
  }
}

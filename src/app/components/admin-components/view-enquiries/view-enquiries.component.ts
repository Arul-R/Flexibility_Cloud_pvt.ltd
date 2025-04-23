import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Enquiry } from '../../../models/enquiry';
import { EnquiryService } from '../../../services/enquiryService';

@Component({
  selector: 'app-view-enquirys',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './view-enquiries.component.html',
  styleUrls: ['./view-enquiries.component.css'],
})
export class ViewEnquiryComponent implements OnInit {
  enquirys: Enquiry[] = [];
  filteredEnquirys: Enquiry[] = [];
  searchQuery = '';

  constructor(private enquiryService: EnquiryService) {}

  ngOnInit(): void {
    this.enquiryService.getEnquiries().subscribe((data) => {
      this.enquirys = data;
      this.filteredEnquirys = data;
    });
  }

  onSearch(): void {
    if (this.searchQuery.trim()) {
      this.enquiryService
        .searchEnquirys(this.searchQuery)
        .subscribe((results) => (this.filteredEnquirys = results));
    } else {
      this.filteredEnquirys = this.enquirys;
    }
  }
}
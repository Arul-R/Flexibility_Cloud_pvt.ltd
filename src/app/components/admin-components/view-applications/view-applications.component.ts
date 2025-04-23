import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Applicant } from '../../../models/applicant';
import { ApplicantService } from '../../../services/applicantService';

@Component({
  selector: 'app-view-applicants',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './view-applications.component.html',
  styleUrls: ['./view-applications.component.css'],
})
export class ViewApplicantsComponent implements OnInit {
  applicants: Applicant[] = [];
  filteredApplicants: Applicant[] = [];
  searchQuery = '';

  constructor(private applicantService: ApplicantService) {}

  ngOnInit(): void {
    this.applicantService.getApplicants().subscribe((data) => {
      this.applicants = data;
      this.filteredApplicants = data;
    });
  }

  onSearch(): void {
    if (this.searchQuery.trim()) {
      this.applicantService
        .searchApplicants(this.searchQuery)
        .subscribe((results) => (this.filteredApplicants = results));
    } else {
      this.filteredApplicants = this.applicants;
    }
  }
}

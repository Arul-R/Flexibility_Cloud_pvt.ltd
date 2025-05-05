import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgFor } from '@angular/common';
import { Applicant } from '../../../models/applicant';
import { ApplicantService } from '../../../services/applicantService';
import { catchError, map, of } from 'rxjs';

@Component({
  selector: 'app-view-applicants',
  standalone: true,
  imports: [CommonModule, FormsModule, NgFor],
  templateUrl: './view-applications.component.html',
  styleUrls: ['./view-applications.component.css'],
})
export class ViewApplicantsComponent implements OnInit {
  applicants: Applicant[] = [];
  filteredApplicants: Applicant[] = [];
  searchQuery = '';
  isLoading = true;
  error: string | null = null;

  constructor(private applicantService: ApplicantService) {}

  ngOnInit(): void {
    this.loadApplicants();
  }

  loadApplicants(): void {
    this.isLoading = true;
    this.error = null;
    
    this.applicantService.getApplicants().pipe(
      map(data => Array.isArray(data) ? data : [data]),
      catchError(err => {
        this.error = 'Failed to load applicants. Please try again later.';
        console.error('Error loading applicants:', err);
        return of([]); // Return empty array on error
      })
    ).subscribe({
      next: (data: Applicant[]) => {
        this.applicants = data;
        this.filteredApplicants = [...data];
        this.isLoading = false;
      }
    });
  }


  updateApplicantStatus(applicant: Applicant, status: 'submitted' | 'rejected' | 'accepted'): void {
    const updatedApplicant = { ...applicant, status };
    this.applicantService.updateApplicant(applicant._id!, updatedApplicant).subscribe({
      next: () => {
        const index = this.applicants.findIndex(a => a._id === applicant._id);
        if (index !== -1) {
          this.applicants[index] = updatedApplicant;
          this.filteredApplicants = [...this.filteredApplicants];
        }
      },
      error: (err) => {
        console.error('Error updating applicant status:', err);
        // Handle error (show toast/message)
      }
    });
  }

  deleteApplicant(_id: string): void {
    if (confirm('Are you sure you want to delete this applicant?')) {
      this.applicantService.deleteApplicant(_id).subscribe({
        next: () => {
          this.applicants = this.applicants.filter(a => a._id !== _id);
          this.filteredApplicants = this.filteredApplicants.filter(a => a._id !== _id);
        },
        error: (err) => {
          console.error('Error deleting applicant:', err);
          // Handle error
        }
      });
    }
  }
}


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

  onSearch(): void {
    if (!this.searchQuery.trim()) {
      this.filteredApplicants = this.applicants;
      return;
    }

    const lowerQuery = this.searchQuery.toLowerCase();
    this.filteredApplicants = this.applicants.filter(applicant => 
      applicant.firstName.toLowerCase().includes(lowerQuery) ||
      applicant.lastName.toLowerCase().includes(lowerQuery) ||
      applicant.email.toLowerCase().includes(lowerQuery) ||
      applicant.phone?.toLowerCase().includes(lowerQuery) ||
      applicant.city?.toLowerCase().includes(lowerQuery) ||
      applicant.address?.toLowerCase().includes(lowerQuery) ||
      applicant.techStack?.some(tech => 
        tech.toLowerCase().includes(lowerQuery)
      )
    );
  }

  updateApplicantStatus(applicant: Applicant, status: 'submitted' | 'rejected' | 'accepted'): void {
    const updatedApplicant = { ...applicant, status };
    this.applicantService.updateApplicant(applicant.id!, updatedApplicant).subscribe({
      next: () => {
        const index = this.applicants.findIndex(a => a.id === applicant.id);
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

  deleteApplicant(id: string): void {
    if (confirm('Are you sure you want to delete this applicant?')) {
      this.applicantService.deleteApplicant(id).subscribe({
        next: () => {
          this.applicants = this.applicants.filter(a => a.id !== id);
          this.filteredApplicants = this.filteredApplicants.filter(a => a.id !== id);
        },
        error: (err) => {
          console.error('Error deleting applicant:', err);
          // Handle error
        }
      });
    }
  }
}


// import { Component } from '@angular/core';
// import { OnInit } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { CommonModule, NgFor } from '@angular/common';
// import { Applicant } from '../../../models/applicant';
// import { ApplicantService } from '../../../services/applicantService';

// @Component({
//   selector: 'app-view-applicants',
//   standalone: true,
//   imports: [CommonModule, FormsModule, NgFor], // Added NgFor for *ngFor
//   templateUrl: './view-applications.component.html',
//   styleUrls: ['./view-applications.component.css'],
// })
// export class ViewApplicantsComponent implements OnInit {
//   applicants: Applicant[] = [];
//   filteredApplicants: Applicant[] = [];
//   searchQuery = '';

//   constructor(private applicantService: ApplicantService) {}

//   ngOnInit(): void {
//     this.applicantService.getApplicants().subscribe((data: Applicant[]) => {
//       this.applicants = data;
//       this.filteredApplicants = data;
//     });
//   }

//   onSearch(): void {
//     if (this.searchQuery.trim()) {
//       this.applicantService
//         .searchApplicants(this.searchQuery)
//         .subscribe((results: Applicant[]) => {
//           this.filteredApplicants = results;
//         });
//     } else {
//       this.filteredApplicants = this.applicants;
//     }
//   }
// }

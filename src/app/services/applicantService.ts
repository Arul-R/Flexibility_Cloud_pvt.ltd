import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Applicant } from '../models/applicant';

@Injectable({
  providedIn: 'root',
})
export class ApplicantService {
  private applicants: Applicant[] = [
    {
      id: '1',
      appliedJobId: '1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '123-456-7890',
      techStack: ['Machine Learning', 'AI', 'Deep Learning'],
      yearsOfExperience: 5,
      address: '123 ML Street',
      city: 'Techville',
      status: 'accepted',
    },
    {
      id: '2',
      appliedJobId: '1',
      firstName: 'Robert',
      lastName: 'Johnson',
      email: 'robert.johnson@example.com',
      phone: '987-654-3210',
      techStack: ['React', 'Flutter', 'Spring Boot'],
      yearsOfExperience: 7,
      address: '456 Quantum Ave',
      city: 'Innovatown',
      status: 'accepted',
    },
  ];

  private applicantsSubject = new BehaviorSubject<Applicant[]>(this.applicants);

  constructor() {}

  /** Get all applicants */
  getApplicants(): Observable<Applicant[]> {
    return this.applicantsSubject.asObservable();
  }

  /** Get applicant by ID */
  getApplicantById(id: string): Observable<Applicant | undefined> {
    const applicant = this.applicants.find((p) => p.id === id);
    return of(applicant);
  }

  /** Add a new applicant */
  addApplicant(applicant: Applicant): void {
    applicant.id = Date.now().toString(); // Auto-generate ID
    applicant.status = 'submitted'; // Set default status

    this.applicants = [...this.applicants, applicant]; // Ensures UI updates
    this.applicantsSubject.next(this.applicants); // Pushes update

    console.log('Applicants after adding:', this.applicants);
  }

  /** Update an existing applicant */
  updateApplicant(updatedApplicant: Applicant): void {
    const index = this.applicants.findIndex((p) => p.id === updatedApplicant.id);
    if (index !== -1) {
      this.applicants[index] = updatedApplicant;
      this.applicantsSubject.next([...this.applicants]);
    }
  }

  /** Search applicants */
  searchApplicants(query: string): Observable<Applicant[]> {
    if (!query.trim()) return of(this.applicants);

    const lowerQuery = query.toLowerCase();
    const filteredApplicants = this.applicants.filter(
      (applicant) =>
        applicant.firstName.toLowerCase().includes(lowerQuery) ||
        applicant.lastName.toLowerCase().includes(lowerQuery) ||
        applicant.email.toLowerCase().includes(lowerQuery) ||
        applicant.phone.toLowerCase().includes(lowerQuery) ||
        applicant.city.toLowerCase().includes(lowerQuery) ||
        applicant.address.toLowerCase().includes(lowerQuery) ||
        applicant.techStack.some((tech) =>
          tech.toLowerCase().includes(lowerQuery)
        )
    );

    return of(filteredApplicants);
  }
}

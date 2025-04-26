import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Applicant } from '../models/applicant';

@Injectable({
  providedIn: 'root'
})
export class ApplicantService {
  private apiUrl = 'http://localhost:3000/api/applicants';

  constructor(private http: HttpClient) { }

  addApplicant(applicant: FormData): Observable<Applicant> {
    return this.http.post<Applicant>(this.apiUrl, applicant);
  }

  // getApplicants(): Observable<Applicant[]> {
  //   return this.http.get<Applicant[]>(this.apiUrl);
  // }

  // getApplicants(): Observable<Applicant[]> {
  //   return this.http.get<Applicant[]>(this.apiUrl).pipe(
  //     map(response => Array.isArray(response) ? response : [response]) // Ensure array
  //   );
  // }

  getApplicants(): Observable<Applicant[]> {
    return this.http.get<{success: boolean, data: Applicant[]}>(this.apiUrl).pipe(
      map(response => response.data) // Extract the data array from the response
    );
  }

  getApplicantById(id: string): Observable<Applicant> {
    return this.http.get<Applicant>(`${this.apiUrl}/${id}`);
  }

  updateApplicant(id: string, applicant: Partial<Applicant>): Observable<Applicant> {
    return this.http.patch<Applicant>(`${this.apiUrl}/${id}`, applicant);
  }

  deleteApplicant(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

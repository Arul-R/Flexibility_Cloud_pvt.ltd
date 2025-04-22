import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Job } from '../models/jobs';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  private jobsSubject = new BehaviorSubject<Job[]>([
    {
      jobId: '1',
      title: 'Frontend Developer',
      description: 'Develop user interfaces using Angular and Tailwind CSS.',
      department: 'Engineering',
      location: 'Bangalore, India',
      salaryRange: '₹10,00,000 - ₹14,00,000',
      jobType: 'Full-Time',
      requiredExperience: 2,
      skillsRequired: ['Angular', 'TypeScript', 'HTML', 'CSS', 'REST APIs'],
      postedDate: new Date('2025-04-01'),
      lastDateToApply: new Date('2025-04-30'),
      status: 'open' as const
    },
    {
      jobId: '2',
      title: 'Backend Developer',
      description: 'Develop scalable backend services using Node.js and MongoDB.',
      department: 'Engineering',
      location: 'Remote',
      salaryRange: '₹12,00,000 - ₹16,00,000',
      jobType: 'Remote',
      requiredExperience: 3,
      skillsRequired: ['Node.js', 'Express', 'MongoDB', 'JWT', 'Docker'],
      postedDate: new Date('2025-03-25'),
      lastDateToApply: new Date('2025-04-20'),
      status: 'open' as const
    },
    {
      jobId: '3',
      title: 'UX Designer',
      description: 'Design user-friendly interfaces and improve UX across the platform.',
      department: 'Design',
      location: 'Hyderabad, India',
      salaryRange: '₹9,00,000 - ₹11,00,000',
      jobType: 'Full-Time',
      requiredExperience: 2,
      skillsRequired: ['Figma', 'User Research', 'Prototyping', 'Adobe XD'],
      postedDate: new Date('2025-03-10'),
      lastDateToApply: new Date('2025-04-10'),
      status: 'closed' as const
    },
    {
      jobId: '4',
      title: 'Data Analyst Intern',
      description: 'Assist in data analysis and reporting tasks.',
      department: 'Business Intelligence',
      location: 'Chennai, India',
      jobType: 'Internship',
      requiredExperience: 0,
      skillsRequired: ['Excel', 'SQL', 'Python', 'Tableau'],
      postedDate: new Date('2025-04-05'),
      lastDateToApply: new Date('2025-04-25'),
      status: 'paused' as const
    }
  ]);

  constructor() {}

  getJobs(): Observable<Job[]> {
    return this.jobsSubject.asObservable();
  }

  closeJob(jobId: string): void {
    const jobs = this.jobsSubject.getValue().map(job => {
      if (job.jobId === jobId && job.status === 'open') {
        return { ...job, status: 'closed' as 'closed' };  // Ensure status is of type 'closed'
      }
      return job;
    });
    this.jobsSubject.next(jobs);
  }
  

  createJob(newJob: Job): void {
    const currentJobs = this.jobsSubject.getValue();
    const jobWithId = { ...newJob, id: crypto.randomUUID() };
    this.jobsSubject.next([...currentJobs, jobWithId]);
  }

  updateJob(updatedJob: Job): void {
    const jobs = this.jobsSubject.getValue().map(job =>
      job.jobId === updatedJob.jobId ? { ...updatedJob } : job
    );
    this.jobsSubject.next(jobs);
  }

  deleteJob(jobId: string): void {
    const jobs = this.jobsSubject.getValue().filter(job => job.jobId !== jobId);
    this.jobsSubject.next(jobs);
  }

  getJobById(jobId: string): Observable<Job | undefined> {
    const job = this.jobsSubject.getValue().find(job => job.jobId === jobId);
    return new Observable<Job | undefined>((observer) => {
      observer.next(job); // Emit the job if found, or undefined if not
      observer.complete();
    });
  }
}

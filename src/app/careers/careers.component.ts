import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Job } from '../models/jobs';
import { JobService } from '../services/jobService';

import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-my-jobs',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './careers.component.html',
  styleUrls: ['./careers.component.css']
})
export class MyJobsComponent implements OnInit {
  jobs: Job[] = [];

  constructor(private jobService: JobService, private router: Router) {}
  
  ngOnInit(): void {
    // Fetch all jobs from the service
    this.jobService.getJobs().subscribe(jobs => {
      this.jobs = jobs;
    });
  }

  applyForJob(jobId: string | undefined): void {
    console.log('Applying for job with ID:', jobId);  // Add this log to check if the function is triggered.
    if (jobId) {
      this.router.navigate(['/job-view', jobId]);  // This should navigate to the job-view page.
    } else {
      console.error('Job ID is undefined');
    }
  }
  
}

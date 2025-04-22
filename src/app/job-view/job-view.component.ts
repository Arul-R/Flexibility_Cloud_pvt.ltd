import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { JobService } from '../services/jobService';
import { Job } from '../models/jobs';

@Component({
  selector: 'job-view',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './job-view.component.html',
  styleUrls: ['./job-view.component.css'],
})
export class JobViewComponent implements OnInit {
  job?: Job;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private jobService: JobService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const projectId = params.get('id');
      if (projectId) {
        this.jobService.getJobById(projectId).subscribe(job => {
          this.job = job;
        });
      }
    });
  }

  onSubmit(jobId: string | undefined): void {
    if (this.job) {
      // this.router.navigate(['application-form/',jobId]);
      this.router.navigate([`/application-form`, jobId]);
    }
  }
}
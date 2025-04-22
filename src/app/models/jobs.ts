export interface Job {
    jobId?: string;
    title: string;
    description: string;
    department: string;
    location: string;
    salaryRange?: string; // e.g., "₹8,00,000 - ₹12,00,000"
    jobType: 'Full-Time' | 'Part-Time' | 'Contract' | 'Internship' | 'Remote';
    requiredExperience: number; // in years
    skillsRequired: string[];
    postedDate: Date;
    lastDateToApply: Date;
    status: 'open' | 'closed' | 'paused';
  }
  
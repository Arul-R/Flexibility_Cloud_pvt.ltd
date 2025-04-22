import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ApplicantService } from '../services/applicantService';
import { Applicant } from '../models/applicant';

@Component({
  selector: 'app-applicant-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,HttpClientModule],
  templateUrl: './application-form.component.html',
  styleUrls: ['./application-form.component.css']
})
export class ApplicantFormComponent implements OnInit {
  applicantForm!: FormGroup;
  isEditMode: boolean = false;
  selectedFile: File | null = null;
  appliedJobId: string = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private applicantService: ApplicantService
  ) {}

  // ngOnInit(): void {
  //   this.appliedJobId = this.route.snapshot.paramMap.get('id') || '';

  //   this.applicantForm = this.fb.group({
  //     firstName: ['', Validators.required],
  //     lastName: ['', Validators.required],
  //     email: ['', [Validators.required, Validators.email]],
  //     phone: [''],
  //     techStack: this.fb.array([this.fb.control('')]),
  //     yearsOfExperience: [''],
  //     address: [''],
  //     city: ['']
  //   });
  // }

  ngOnInit(): void {
    this.appliedJobId = this.route.snapshot.paramMap.get('id') || '';
    
    this.applicantService.getApplicants().subscribe((applicants) => {
      console.log('Updated Applicants:', applicants);
    });
  
    this.applicantForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      techStack: this.fb.array([this.fb.control('')]),
      yearsOfExperience: [''],
      address: [''],
      city: ['']
    });
  }
  


  get techStack(): FormArray {
    return this.applicantForm.get('techStack') as FormArray;
  }

  addTechStack(): void {
    this.techStack.push(this.fb.control(''));
  }

  removeTechStack(index: number): void {
    this.techStack.removeAt(index);
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  onSubmit(): void {
    if (this.applicantForm.invalid) {
      this.applicantForm.markAllAsTouched();
      return;
    }

    const applicant: Applicant = {
      ...this.applicantForm.value,
      appliedJobId: this.appliedJobId,
      id: '', // will be assigned in service
      status: '' // will be set in service
    };

    this.applicantService.addApplicant(applicant);

    console.log('Applicant added:', applicant);

    // reset form
    this.applicantForm.reset();
    this.techStack.clear();
    this.techStack.push(this.fb.control(''));
  }
}


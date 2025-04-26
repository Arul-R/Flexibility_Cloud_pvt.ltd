import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ApplicantService } from '../../../services/applicantService';

@Component({
  selector: 'app-applicant-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './application-form.component.html',
  styleUrls: ['./application-form.component.css']
})
export class ApplicantFormComponent implements OnInit {
  applicantForm: FormGroup;
  isEditMode = false;
  selectedFile: File | null = null;
  submitted = false;
  successMessage = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private applicantService: ApplicantService
  ) {
    this.applicantForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.pattern(/^[0-9]{10,15}$/)]],
      techStack: this.fb.array([this.fb.control('')]),
      yearsOfExperience: ['', [Validators.min(0), Validators.max(50)]],
      address: [''],
      city: [''],
      resume: [null]
    });
  }

  ngOnInit(): void {}

  get techStack(): FormArray {
    return this.applicantForm.get('techStack') as FormArray;
  }

  addTechStack(): void {
    this.techStack.push(this.fb.control(''));
  }

  removeTechStack(index: number): void {
    if (this.techStack.length > 1) {
      this.techStack.removeAt(index);
    }
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.applicantForm.patchValue({ resume: file });
    }
  }

  onSubmit(): void {
    this.submitted = true;
    this.successMessage = '';
    this.errorMessage = '';

    if (this.applicantForm.invalid) {
      return;
    }

    const formData = new FormData();
    const formValue = this.applicantForm.value;

    // Append all form fields to FormData
    Object.keys(formValue).forEach(key => {
      if (key === 'techStack') {
        formData.append(key, JSON.stringify(formValue[key]));
      } else if (key === 'resume' && this.selectedFile) {
        formData.append('resume', this.selectedFile, this.selectedFile.name);
      } else {
        formData.append(key, formValue[key]);
      }
    });

    this.applicantService.addApplicant(formData).subscribe({
      next: (response) => {
        this.successMessage = 'Application submitted successfully!';
        this.applicantForm.reset();
        this.techStack.clear();
        this.addTechStack();
        this.selectedFile = null;
        this.submitted = false;
      },
      error: (error) => {
        this.errorMessage = error.error?.message || 'Error submitting application. Please try again.';
        console.error('Error submitting application:', error);
      }
    });
  }
}
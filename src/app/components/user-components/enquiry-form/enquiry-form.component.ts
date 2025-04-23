// client/src/app/components/enquiry-form/enquiry-form.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EnquiryService } from '../../../services/enquiryService';
import { Enquiry } from '../../../models/enquiry';


@Component({
  selector: 'app-enquiry-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './enquiry-form.component.html' ,
  styleUrls: ['./enquiry-form.component.css']
})
export class EnquiryFormComponent {
  enquiryForm: FormGroup;
  submitted = false;
  success = false;
  errorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private enquiryService: EnquiryService
  ) {
    this.enquiryForm = this.formBuilder.group({
      // firstName: ['', [Validators.required]],
      // lastName: ['', [Validators.required]],
      // email: ['', [Validators.required, Validators.email]],
      // phone: ['', [Validators.pattern(/^\d{10}$/)]],
      // address: ['']



      service: ['Training'], // Default value for optional field
      orgName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      description: ['', [Validators.required]],
      reqTechStack: [[''], [Validators.required]]

    });
  }


  
  // Getter for easy access to form fields
  get f() {
    return this.enquiryForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    this.success = false;
    this.errorMessage = '';
    
    // Stop if form is invalid
    if (this.enquiryForm.invalid) {
      return;
    }

    const enquiryData: Enquiry = { ...this.enquiryForm.value };

    
    console.log('Submitting enquiry data:', enquiryData);  // Debug log

    this.enquiryService.createEnquiry(enquiryData).subscribe({
      next: (response) => {
        this.success = true;
        this.submitted = false;
        this.enquiryForm.reset();
        console.log('Enquiry created successfully', response);
      },
      error: (error) => {
        this.errorMessage = error.message || 'An error occurred while submitting the form.';
        console.error('Error creating enquiry:', error);
      }
    });
  }
}

// import { Component, inject } from '@angular/core';
// import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import { NgIf, NgFor } from '@angular/common';

// @Component({
//   selector: 'app-enquiry-form',
//   standalone: true,
//   imports: [CommonModule, ReactiveFormsModule, NgIf, NgFor],
//   templateUrl: './enquiry-form.component.html',
//   styleUrl: './enquiry-form.component.css',
// })
// export class EnquiryFormComponent {
//   private fb = inject(FormBuilder);

//   enquiryForm: FormGroup = this.fb.group({
//     name: ['', Validators.required],
//     email: ['', [Validators.required, Validators.email]],
//     phone: ['', Validators.required],
//     serviceInterested: ['', Validators.required],
//     reqTechStack: this.fb.array([this.fb.control('')])
//   });

//   get reqTechStack(): FormArray {
//     return this.enquiryForm.get('reqTechStack') as FormArray;
//   }

//   addTech(): void {
//     this.reqTechStack.push(this.fb.control(''));
//   }

//   removeTech(index: number): void {
//     if (this.reqTechStack.length > 1) {
//       this.reqTechStack.removeAt(index);
//     }
//   }

//   onSubmit(): void {
//     if (this.enquiryForm.valid) {
//       console.log('Form submitted:', this.enquiryForm.value);
//     }
//   }
// }

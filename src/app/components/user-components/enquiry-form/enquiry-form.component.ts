// src/app/components/enquiry-form/enquiry-form.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { EnquiryService } from '../../../services/enquiryService';

@Component({
  selector: 'app-enquiry-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './enquiry-form.component.html',
  styleUrls: ['./enquiry-form.component.css']
})
export class EnquiryFormComponent {
  enquiryForm: FormGroup;
  submitted = false;
  success = false;
  errorMessage = '';

  constructor(private fb: FormBuilder, private enquiryService: EnquiryService) {
    this.enquiryForm = this.fb.group({
      service: ['Training', Validators.required],
      orgName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      reqTechStack: ['', Validators.required],
      address: [''],
      city: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  // Convenience getter for easy access to form fields
  get f() { return this.enquiryForm.controls; }

  onSubmit() {
    this.submitted = true;
    this.success = false;
    this.errorMessage = '';

    if (this.enquiryForm.invalid) {
      return;
    }

    // Convert comma-separated tech stack to array
    const formValue = {
      ...this.enquiryForm.value,
      reqTechStack: this.enquiryForm.value.reqTechStack
        .split(',')
        .map((tech: string) => tech.trim())
        .filter((tech: string) => tech.length > 0)
    };

    this.enquiryService.submitEnquiry(formValue).subscribe({
      next: () => {
        this.success = true;
        this.enquiryForm.reset({
          service: 'Training'
        });
        this.submitted = false;
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'An error occurred while submitting the enquiry.';
      }
    });
  }
}





// // src/app/components/enquiry-form/enquiry-form.component.ts
// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormBuilder, FormGroup, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';

// import { HttpClientModule } from '@angular/common/http';
// import { EnquiryService } from '../../../services/enquiryService';
// import { Enquiry } from '../../../models/enquiry';
// @Component({
//   selector: 'app-enquiry-form',
//   standalone: true,
//   imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
//   templateUrl: './enquiry-form.component.html',
//   styleUrls: ['./enquiry-form.component.css']
// })
// export class EnquiryFormComponent {
//   enquiryForm: FormGroup;
//   techStackOptions: string[] = ['React', 'Angular', 'Vue', 'Node.js', 'TypeScript', 'JavaScript', 'AWS', 'Azure', 'Python', 'Java'];
//   submitted = false;
//   success = false;
//   error = '';

//   constructor(private fb: FormBuilder, private enquiryService: EnquiryService) {
//     this.enquiryForm = this.fb.group({
//       service: ['Training', Validators.required],
//       orgName: ['', Validators.required],
//       email: ['', [Validators.required, Validators.email]],
//       phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
//       reqTechStack: this.fb.array([], Validators.required),
//       address: ['', Validators.required],
//       city: ['', Validators.required],
//       description: ['', Validators.required]
//     });
//   }

//   get techStackControls() {
//     return (this.enquiryForm.get('reqTechStack') as FormArray).controls;
//   }

//   onTechStackChange(tech: string, isChecked: boolean) {
//     const techStackArray = this.enquiryForm.get('reqTechStack') as FormArray;

//     if (isChecked) {
//       techStackArray.push(this.fb.control(tech));
//     } else {
//       const index = techStackArray.controls.findIndex(x => x.value === tech);
//       techStackArray.removeAt(index);
//     }
//   }

//   onSubmit() {
//     this.submitted = true;
//     this.success = false;
//     this.error = '';

//     if (this.enquiryForm.invalid) {
//       return;
//     }

//     const enquiryData: Enquiry = this.enquiryForm.value;
    
//     this.enquiryService.submitEnquiry(enquiryData).subscribe({
//       next: () => {
//         this.success = true;
//         this.enquiryForm.reset({
//           service: 'Training',
//           reqTechStack: []
//         });
//         this.submitted = false;
//       },
//       error: (err) => {
//         this.error = err.error?.message || 'An error occurred while submitting the enquiry.';
//       }
//     });
//   }
// }


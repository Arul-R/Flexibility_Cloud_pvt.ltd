import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { EnquiryService } from '../services/enquiryService';
import { Enquiry } from '../models/enquiry';


@Component({
  selector: 'app-training',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent {
  enquiryForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private enquiryService: EnquiryService
  ) {
    this.enquiryForm = this.fb.group({
      service: ['Training'],
      orgName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      reqTechStack: this.fb.array([this.fb.control('', Validators.required)]),
      address: ['', Validators.required],
      city: ['', Validators.required],
      description: ['']
    });
  }

  get reqTechStack(): FormArray {
    return this.enquiryForm.get('reqTechStack') as FormArray;
  }

  addTech(): void {
    this.reqTechStack.push(this.fb.control('', Validators.required));
  }

  removeTech(index: number): void {
    if (this.reqTechStack.length > 1) {
      this.reqTechStack.removeAt(index);
    }
  }

  onSubmit(): void {
    if (this.enquiryForm.valid) {
      const enquiry: Enquiry = this.enquiryForm.value;
      this.enquiryService.addEnquiry(enquiry);
      alert('Enquiry submitted!');
      this.enquiryForm.reset({ service: 'Training' });
      this.reqTechStack.clear();
      this.addTech(); // Ensure one tech field remains
    } else {
      alert('Please fill all required fields.');
    }
  }
}

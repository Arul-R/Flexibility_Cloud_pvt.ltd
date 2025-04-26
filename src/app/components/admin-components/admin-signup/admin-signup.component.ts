import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common'; // Import CommonModule for *ngIf
import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule for formGroup

@Component({
  selector: 'app-admin-signup',
  standalone: true, // This ensures the component works without needing the module.
  imports: [CommonModule, ReactiveFormsModule, RouterModule], // Add these to the imports array
  templateUrl: './admin-signup.component.html',
  styleUrls: ['./admin-signup.component.css']
})
export class AdminSignupComponent implements OnInit {
  form!: FormGroup;
  errorMsg = '';

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]]
      },
      {
        validators: this.passwordMatcher
      }
    );
  }

  // Password matching validation
  passwordMatcher(group: FormGroup): { [key: string]: boolean } | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;

    return password && confirmPassword && password !== confirmPassword
      ? { passwordMismatch: true }
      : null;
  }

  signup(): void {
    if (this.form.invalid) {
      console.log('Form is invalid:', this.form.value);
      return;
    }

    const { email, password } = this.form.value;

    this.auth.signupAdmin({ email, password }).subscribe({
      next: (res) => {
        console.log('Signup successful:', res);
        this.router.navigate(['/admin-login']);
      },
      error: (err) => {
        console.error('Signup failed:', err);
        this.errorMsg = err.error?.message || 'Signup failed';
      }
    });
  }
}

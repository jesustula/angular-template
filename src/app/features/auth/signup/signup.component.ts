import { NgIf } from '@angular/common';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { User } from '../../../models/user.model';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  private authService = inject(AuthService);
  private router = inject(Router);


  signupForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    last_name: new FormControl('', [Validators.required]),
    second_last_name: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    confirmPassword: new FormControl('', [Validators.required]),
  });
  user: User = new User();

  errorMessage: string = '';

  onSubmit() {
    const {
      name,
      last_name,
      second_last_name,
      email,
      password,
      confirmPassword,
    } = this.signupForm.value;
    if (password !== confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }
    this.user.name = name ?? '';
    this.user.last_name = last_name ?? '';
    this.user.second_last_name = second_last_name ?? '';
    this.user.email = email ?? '';
    this.user.password = password ?? '';
    this.errorMessage = '';

    this.authService.signup(this.user).subscribe({
      next: (response) => {
        console.log('User registered successfully:', response);
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Error during signup:', error);
        this.errorMessage = 'An error occurred during signup. Please try again.';
      },
    });
  }
}

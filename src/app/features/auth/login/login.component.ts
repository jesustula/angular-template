import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [RouterLink,ReactiveFormsModule,NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  loginForm = new FormGroup({

    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

   errorMessage: string = '';

   onSubmit() {
    const {
      email,
      password,
    } = this.loginForm.value;

    this.errorMessage = '';

    this.authService.login(email!,password!).subscribe({
      next: (response) => {
        console.log('response:', response);
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        console.error('Error during signup:', error);
        this.errorMessage = 'An error occurred during signup. Please try again.';
      },
    });
  }

}

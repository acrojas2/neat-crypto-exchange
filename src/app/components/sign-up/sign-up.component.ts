import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-signup',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  imports: [ReactiveFormsModule, RouterLink, CommonModule]
})
export class SignupComponent {
  signupForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    const { email, password } = this.signupForm.value;
    this.authService.signUp(email, password).then(() => {
      this.router.navigate(['/home']);
    }).catch(err => {
      if (err.code === 'auth/email-already-in-use') {
        this.errorMessage = 'Este correo ya está registrado.';
      } else {
        this.errorMessage = 'Ha ocurrido un error. Inténtelo nuevamente.';
      }
      this.signupForm.reset();
    });
  }
}

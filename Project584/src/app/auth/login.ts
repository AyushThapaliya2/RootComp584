import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private readonly fb = inject(FormBuilder);
  error: string | null = null;

  form = this.fb.group({
    userName: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(private auth: AuthService, private router: Router) {}

  submit() {
    this.error = null;
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { userName, password } = this.form.value;
    this.auth.login({ userName: userName!, password: password! }).subscribe({
      next: (res) => {
        if (res.success && res.token) {
          this.router.navigateByUrl('/');
        } else {
          this.error = res.message ?? 'Login failed.';
        }
      },
      error: (err) => {
        this.error = err?.error ?? 'Login failed.';
      },
    });
  }

  goToRegister() {
    this.router.navigateByUrl('/register');
  }
}

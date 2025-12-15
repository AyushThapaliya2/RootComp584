import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  private readonly fb = inject(FormBuilder);
  error: string | null = null;

  form = this.fb.group({
    userName: ['', Validators.required],
    email: ['', [Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(private auth: AuthService, private router: Router) {}

  submit() {
    this.error = null;
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { userName, email, password } = this.form.value;
    this.auth.register({ userName: userName!, password: password!, email: email ?? undefined }).subscribe({
      next: (res) => {
        if (res.success && res.token) {
          this.router.navigateByUrl('/');
        } else {
          this.error = res.message ?? 'Registration failed.';
        }
      },
      error: (err) => {
        this.error = err?.error ?? 'Registration failed.';
      },
    });
  }
}

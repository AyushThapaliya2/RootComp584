import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Observable, tap } from 'rxjs';

export interface LoginRequest {
  userName: string;
  password: string;
}

export interface LoginResult {
  success: boolean;
  message?: string;
  token?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly tokenKey = 'shelter_jwt';
  private readonly platformId = inject(PLATFORM_ID);
  isLoggedInSignal = signal<boolean>(false);

  constructor(private http: HttpClient) {}

  login(request: LoginRequest): Observable<LoginResult> {
    return this.http
      .post<LoginResult>(`${environment.apiUrl}api/Admin/Login`, request)
      .pipe(tap((res) => res.token && this.setToken(res.token)));
  }

  register(request: LoginRequest & { email?: string }): Observable<LoginResult> {
    return this.http
      .post<LoginResult>(`${environment.apiUrl}api/Admin/Register`, request)
      .pipe(tap((res) => res.token && this.setToken(res.token)));
  }

  setToken(token: string) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.tokenKey, token);
      this.isLoggedInSignal.set(true);
    }
  }

  getToken(): string | null {
    if (!isPlatformBrowser(this.platformId)) {
      return null;
    }
    return localStorage.getItem(this.tokenKey);
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.tokenKey);
      this.isLoggedInSignal.set(false);
    }
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    const loggedIn = !!token;
    this.isLoggedInSignal.set(loggedIn);
    return loggedIn;
  }
}

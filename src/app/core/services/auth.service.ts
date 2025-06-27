// 📁 src/app/core/services/auth.service.ts
import { Inject, Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../enviroments/enviroment'; // ✅ CORREGIDO
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../../models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private isBrowser: boolean;
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  private userSubject = new BehaviorSubject<User | null>(this.getStoredUser());
  user$ = this.userSubject.asObservable();

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  private setUser(user: User) {
    if (this.isBrowser) {
      localStorage.setItem('user', JSON.stringify(user));
      this.userSubject.next(user);
    }
  }

  private getStoredUser(): User | null {
    if (!this.isBrowser) return null;
    const userJson = localStorage.getItem('user');
    return userJson ? JSON.parse(userJson) : null;
  }

  loadSession() {
    if (this.isBrowser) {
      const storedUser = this.getStoredUser();
      if (storedUser) {
        this.userSubject.next(storedUser);
      }
    }
  }

  isLoggedIn(): boolean {
    if (!this.isBrowser) return false;
    return !!localStorage.getItem('token');
  }

  login(
    email: string,
    password: string
  ): Observable<{ token: string; user: User }> {
    return this.http
      .post<{ token: string; user: User }>(`${this.apiUrl}/auth/login`, {
        email,
        password,
      })
      .pipe(
        tap((response) => {
          if (this.isBrowser) {
            localStorage.setItem('token', response.token);
            this.setUser(response.user);
          }
        })
      );
  }

  signup(user: User): Observable<User> {
    const payload = user.toCreate();
    return this.http.post<User>(`${this.apiUrl}/auth/signup`, payload).pipe(
      tap((response) => {
        if (this.isBrowser) {
          console.log('User created:', response);
        }
      })
    );
  }

  logout(): void {
    if (this.isBrowser) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      this.userSubject.next(null);
    }
  }

  getCurrentUser(): User | null {
    return this.userSubject.value;
  }
}

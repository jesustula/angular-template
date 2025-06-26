import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  isLoggedIn(): boolean {
    if (!this.isBrowser) return false;
    return !!localStorage.getItem('token');
  }

  login(token: string) {
    if (this.isBrowser) {
      localStorage.setItem('token', token);
    }
  }

  logout() {
    if (this.isBrowser) {
      localStorage.removeItem('token');
    }
  }
}

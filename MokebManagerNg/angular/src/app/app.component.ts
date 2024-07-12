import { AuthService } from '@abp/ng.core';
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <abp-loader-bar></abp-loader-bar>
    <abp-dynamic-layout></abp-dynamic-layout>
    <abp-internet-status></abp-internet-status>
    <app-footer></app-footer>
  `,
})
export class AppComponent {
  /**
   *
   */
  constructor(private authService: AuthService) {
    if (!this.hasLoggedIn) this.login();
  }

  get hasLoggedIn(): boolean {
    return this.authService.isAuthenticated;
  }

  login() {
    this.authService.navigateToLogin();
  }
}

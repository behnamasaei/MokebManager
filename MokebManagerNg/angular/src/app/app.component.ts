import { AuthService } from '@abp/ng.core';

import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  template: `
    <abp-loader-bar></abp-loader-bar>
    <abp-dynamic-layout></abp-dynamic-layout>
    <abp-internet-status></abp-internet-status>
    <app-footer></app-footer>
  `,
  styleUrl: 'app.component.scss',
})
export class AppComponent {
  /**
   *
   */
  constructor(private authService: AuthService, private router: Router) {
    // if (!this.hasLoggedIn) this.login();
  }

  get hasLoggedIn(): boolean {
    return this.authService.isAuthenticated;
  }

  login() {
    // this.router.navigate(['mokeb-account', 'login']);
    // this.authService.navigateToLogin();
    // this.logdin.login({ username: 'admin', password: '1q2w3E*' }).subscribe(x => {
    //   console.log(x);
    // });
  }
}

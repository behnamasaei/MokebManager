import { AuthService, LoginParams } from '@abp/ng.core';
import { IdentityUserService } from '@abp/ng.identity/proxy';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MokebAuthService } from 'src/app/shared/mokeb-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  userName: string;
  password: string;
  remember: boolean = true;

  /**
   *
   */
  constructor(
    private authService: AuthService,
    private router: Router,
    private mokebAuth: MokebAuthService
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    console.log(this.authService.isAuthenticated);
  }

  login() {
    const loginParams: LoginParams = {
      username: this.userName,
      password: this.password,
      rememberMe: this.remember,
    };

    this.mokebAuth
      .login({
        userNameOrEmailAddress: this.userName,
        password: this.password,
        rememberMe: this.remember,
      })
      .subscribe({
        next: response => {
          // Handle successful login
          console.log('Login successful', response);
          // localStorage.setItem('authToken', response.accessToken);
          this.router.navigate(['/']); // Navigate to a different route after login
        },
        error: err => {
          // Handle login error
          console.error('Login failed', err);
        },
      });
  }
}

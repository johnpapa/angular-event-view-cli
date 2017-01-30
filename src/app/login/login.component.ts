import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { LoginService } from './login.service';
import { ToastService, UserProfileService } from '../core';

@Component({
  moduleId: module.id,
  templateUrl: 'login.component.html',
  providers: [LoginService]
})
export class LoginComponent implements OnDestroy {
  private loginSub: Subscription;

  constructor(
    private loginService: LoginService,
    private route: ActivatedRoute,
    private router: Router,
    private toastService: ToastService,
    private userProfileService: UserProfileService) {
  }

  public get isLoggedIn(): boolean {
    return this.userProfileService.isLoggedIn;
  }

  login() {
    this.loginSub = this.loginService
      .login()
      .mergeMap(loginResult => this.route.queryParams)
      .map(qp => qp['redirectTo'])
      .subscribe(redirectTo => {
        this.toastService.activate(`Successfully logged in`);
        if (this.userProfileService.isLoggedIn) {
          let url = redirectTo ? [redirectTo] : [ '/dashboard' ];
          this.router.navigate(url);
        }
      });
  }

  logout() {
    this.loginService.logout();
    this.toastService.activate(`Successfully logged out`);
  }

  ngOnDestroy() {
    if (this.loginSub) {
      this.loginSub.unsubscribe();
    }
  }
}

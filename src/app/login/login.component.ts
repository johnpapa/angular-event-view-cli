import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

import { LoginService } from './login.service';
import { ToastService, UserProfileService } from '../core';

@Component({
  templateUrl: './login.component.html',
  providers: [LoginService]
})
export class LoginComponent implements OnDestroy {
  private subs = new Subscription();

  constructor(
    private loginService: LoginService,
    private route: ActivatedRoute,
    private router: Router,
    private toastService: ToastService,
    private userProfileService: UserProfileService
  ) {}

  public get isLoggedIn(): boolean {
    return this.userProfileService.isLoggedIn;
  }

  login() {
    this.subs.add(
      this.loginService
        .login()
        .pipe(
          mergeMap(loginResult => this.route.queryParams),
          map(qp => qp['redirectTo'])
        )
        .subscribe(redirectTo => {
          this.toastService.activate(`Successfully logged in`);
          if (this.userProfileService.isLoggedIn) {
            const url = redirectTo ? [redirectTo] : ['/dashboard'];
            this.router.navigate(url);
          }
        })
    );
  }

  logout() {
    this.loginService.logout();
    this.toastService.activate(`Successfully logged out`);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}

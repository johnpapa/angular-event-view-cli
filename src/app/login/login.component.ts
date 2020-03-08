import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

import { LoginService } from './login.service';
import { ToastService, UserProfileService } from '../core';

@Component({
  template: getTemplate(),
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

function getTemplate() {
  return `
    <article class="template animated slideInRight">
      <h4>Login</h4>
      <p>
        <button
          class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--accent mdl-button--raised"
          (click)="login()"
          *ngIf="!isLoggedIn"
        >
          Login
        </button>

        <button
          class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--accent mdl-button--raised"
          (click)="logout()"
          *ngIf="isLoggedIn"
        >
          Logout
        </button>
      </p>
    </article>
  `;
}

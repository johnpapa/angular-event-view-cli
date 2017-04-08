import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/takeuntil';

import { LoginService } from './login.service';
import { ToastService, UserProfileService } from '../core';

@Component({
  templateUrl: './login.component.html',
  providers: [LoginService]
})
export class LoginComponent implements OnDestroy {
  private destroyed: Subject<boolean> = new Subject();
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
      .takeUntil(this.destroyed)
      .subscribe(redirectTo => {
        this.toastService.activate(`Successfully logged in`);
        if (this.userProfileService.isLoggedIn) {
          const url = redirectTo ? [redirectTo] : [ '/dashboard' ];
          this.router.navigate(url);
        }
      });
  }

  logout() {
    this.loginService.logout();
    this.toastService.activate(`Successfully logged out`);
  }

  ngOnDestroy() {
    this.destroyed.next(true);
    // if (this.loginSub) {
    //   this.loginSub.unsubscribe();
    // }
  }
}

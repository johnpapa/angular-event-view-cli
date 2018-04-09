import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

import { SpinnerService, UserProfileService } from '../core';

@Injectable()
export class LoginService {
  constructor(
    private spinnerService: SpinnerService,
    private userProfileService: UserProfileService
  ) {}

  login() {
    return of(true).pipe(
      tap(_ => this.spinnerService.show()),
      delay(1000),
      tap(this.toggleLogState.bind(this))

      // .do((val: boolean) => {
      //   this.isLoggedIn = true;
      //   console.log(this.isLoggedIn);
      // });
    );
  }

  logout() {
    this.toggleLogState(false);
  }

  private toggleLogState(val: boolean) {
    this.userProfileService.isLoggedIn = val;
    this.spinnerService.hide();
  }
}

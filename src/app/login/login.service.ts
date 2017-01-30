import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { SpinnerService, UserProfileService } from '../core';

@Injectable()
export class LoginService {
  constructor(
    private spinnerService: SpinnerService,
    private userProfileService: UserProfileService) { }

  login() {
    return Observable.of(true)
        .do(_ => this.spinnerService.show())
        .delay(1000)
        .do(this.toggleLogState.bind(this));
        // .do((val: boolean) => {
        //   this.isLoggedIn = true;
        //   console.log(this.isLoggedIn);
        // });
  }

  logout() {
    this.toggleLogState(false);
  }

  private toggleLogState(val: boolean) {
    this.userProfileService.isLoggedIn = val;
    this.spinnerService.hide();
  }
}

import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { ToastService } from '../toast.service';
import { UserProfileService } from '../user-profile.service';

export const isAuthenticatedGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const deniedMessage = 'Unauthorized, access denied';
  const userProfileService = inject(UserProfileService);
  const toastService = inject(ToastService);
  const router = inject(Router);

  if (userProfileService.isLoggedIn) {
    return true;
  }

  const url = `/login?redirectTo=${state.url}`;
  const urlTree = router.parseUrl(url);
  router.navigateByUrl(urlTree);

  toastService.activate(deniedMessage);
  return false;
};

// old

// import { Injectable } from '@angular/core';
// import { Route, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

// import { ToastService } from '../toast.service';
// import { UserProfileService } from '../user-profile.service';

// @Injectable({ providedIn: 'root' })
// export class AuthGuard {
//   deniedMessage = 'Unauthorized access denied';

//   constructor(
//     private userProfileService: UserProfileService,
//     private toastService: ToastService,
//     private router: Router
//   ) {}

//   canLoad(route: Route) {
//     if (this.userProfileService.isLoggedIn) {
//       return true;
//     }

//     const url = `/${route.path}`;
//     this.router.navigate(['/login'], { queryParams: { redirectTo: url } });
//     this.toastService.activate(this.deniedMessage);
//     return this.userProfileService.isLoggedIn;
//   }

//   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
//     if (this.userProfileService.isLoggedIn) {
//       return true;
//     }
//     this.router.navigate(['/login'], {
//       queryParams: { redirectTo: state.url },
//     });
//     this.toastService.activate(this.deniedMessage);
//     return false;
//   }

//   canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
//     return this.canActivate(route, state);
//   }
// }

import { inject } from '@angular/core';
import { CanMatchFn, Route, UrlSegment } from '@angular/router';
import { Router } from '@angular/router';
import { UserProfileService } from '../user-profile.service';

export const authLoadGuard: CanMatchFn = (route: Route, segments: UrlSegment[]) => {
  const deniedMessage = '💂‍♀️ [Guard] - Auth Guard - Unauthorized access denied';

  const userProfileService = inject(UserProfileService);
  const router = inject(Router);
  if (userProfileService.isLoggedIn) {
    console.log(`💂‍♀️ [Guard] - Auth Load Guard - allowed`);
    return true;
  }

  const url = `/signin?redirectTo=/${route.path}`;
  const urlTree = router.parseUrl(url);
  router.navigateByUrl(urlTree);
  console.warn(deniedMessage);
  return userProfileService.isLoggedIn;
};

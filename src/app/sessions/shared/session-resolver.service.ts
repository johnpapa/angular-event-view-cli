import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { Session } from './session.model';
import { SessionService } from './session.service';

@Injectable()
export class SessionResolver implements Resolve<Session> {
  constructor(private sessionService: SessionService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // const id = +route.params['id'];
    const id = +route.paramMap.get('id');
    return this.sessionService.getSession(id).pipe(
      map(session => {
        if (session) {
          return session;
        }
        // Return a new object, because we're going to create a new one
        return new Session();
        // We could throw an error here and catch it
        // and route back to the speaker list
        // let msg = `session id ${id} not found`;
        // console.log(msg);
        // throw new Error(msg)
      }),
      catchError((error: any) => {
        console.log(`${error}. Heading back to session list`);
        this.router.navigate(['/sessions']);
        return of(null);
      })
    );
  }
}

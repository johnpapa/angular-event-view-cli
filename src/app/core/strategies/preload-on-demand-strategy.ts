import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, EMPTY } from 'rxjs';
import { Injectable } from '@angular/core';
import { switchMap, tap, mergeMap } from 'rxjs/operators';
import { PreloadOnDemandService, PreloadOnDemandOptions } from './preload-on-demand.service';

@Injectable({ providedIn: 'root', deps: [PreloadOnDemandService] })
export class PreloadOnDemandStrategy implements PreloadingStrategy {
  private preloadOnDemand$: Observable<PreloadOnDemandOptions>;

  constructor(private preloadOnDemandService: PreloadOnDemandService) {
    this.preloadOnDemand$ = this.preloadOnDemandService.state;
  }

  preload(route: Route, load: () => Observable<any>): Observable<any> {
    return this.preloadOnDemand$.pipe(
      /**
       * Using mergeMap because order is not important,
       * and we do not want to cancel previous one.
       * switchMap could cancel previous call.
       * concatMap would make the multiple calls wait for each other.
       */
      mergeMap(preloadOptions => {
        const shouldPreload = this.preloadCheck(route, preloadOptions);
        console.log(`${shouldPreload ? '' : 'Not '}Preloading ${route.path}`);
        return shouldPreload ? load() : EMPTY;
      })
    );
  }

  private preloadCheck(route: Route, preloadOptions: PreloadOnDemandOptions) {
    return (
      route.data &&
      route.data['preload'] &&
      [route.path, '*'].includes(preloadOptions.routePath) &&
      preloadOptions.preload
    );
  }
}

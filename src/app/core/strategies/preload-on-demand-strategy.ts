import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, EMPTY } from 'rxjs';
import { Injectable } from '@angular/core';
import { switchMap, tap } from 'rxjs/operators';
import { PreloadOnDemandService, PreloadOnDemandOptions } from './preload-on-demand.service';

@Injectable({ providedIn: 'root', deps: [PreloadOnDemandService] })
export class PreloadOnDemandStrategy implements PreloadingStrategy {
  private preloadOnDemand$: Observable<PreloadOnDemandOptions>;

  constructor(private preloadOnDemandService: PreloadOnDemandService) {
    this.preloadOnDemand$ = this.preloadOnDemandService.state;
  }

  preload(route: Route, load: () => Observable<any>): Observable<any> {
    return this.preloadOnDemand$.pipe(
      switchMap(preloadOptions => {
        const shouldPreload =
          route.data &&
          route.data['preload'] &&
          [route.path, '*'].includes(preloadOptions.routePath) &&
          preloadOptions.preload;
        console.log(`${shouldPreload ? '' : 'Not '}Preloading ${route.path}`);

        return shouldPreload ? load() : EMPTY;
      })
    );
  }
}

import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, of, EMPTY, BehaviorSubject, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { mergeMap, map, switchMap } from 'rxjs/operators';

// avoid typing issues for now
declare var navigator;

@Injectable({ providedIn: 'root' })
export class PreloadSelectedModulesList implements PreloadingStrategy {
  preload(route: Route, load: () => Observable<any>): Observable<any> {
    return route.data && route.data['preload'] ? load() : EMPTY;
  }
}

@Injectable({ providedIn: 'root' })
export class NetworkAwarePreloadStrategy implements PreloadingStrategy {
  preload(route: Route, load: () => Observable<any>): Observable<any> {
    return this.hasGoodConnection() ? load() : EMPTY;
  }

  hasGoodConnection(): boolean {
    const conn = navigator.connection;

    if (conn) {
      if (conn.saveData) {
        return false; // save data mode is enabled, so dont preload
      }
      const avoidTheseConnections = ['slow-2g', '2g' /* , '3g', '4g' */];
      const effectiveType = conn.effectiveType || '';
      console.log(effectiveType);
      if (avoidTheseConnections.includes(effectiveType)) {
        return false;
      }
    }
    return true;
  }
}

@Injectable({ providedIn: 'root' })
export class PreloadExecutioner {
  private subject = new BehaviorSubject<string>(undefined);
  state = this.subject;

  makeItSo() {
    this.subject.next('ready');
  }
}

@Injectable({ providedIn: 'root', deps: [PreloadExecutioner] })
export class WhenReadyPreloadStrategy implements PreloadingStrategy {
  onReady: Subject<string>;

  // private subject = new BehaviorSubject<boolean>(false);
  // onReady = this.subject;

  // makeItSo() {
  //   this.subject.next(true);
  // }

  constructor(private preloadExecutioner: PreloadExecutioner) {
    // constructor() {
    this.onReady = this.preloadExecutioner.state; // .subscribe(state => this.preload());
  }

  preload(route: Route, load: () => Observable<any>): Observable<any> {
    // return load();
    const whenReady = this.onReady.pipe(
      switchMap((isReady, index) => {
        console.log(isReady);
        return isReady ? load() : EMPTY;
      })
    );
    return route.data && route.data['preload'] ? whenReady : EMPTY;
    // return this.onReady.pipe(mergeMap(() => load()));
  }
}

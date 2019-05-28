import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PreloadSelectedModulesList implements PreloadingStrategy {
  preload(route: Route, load: () => Observable<any>): Observable<any> {
    return route.data && route.data['preload'] ? load() : EMPTY;
  }
}

@Injectable({providedIn: 'root'})
export class NetworkAwarePreloadStrategy implements PreloadingStrategy {
  preload(route: Route, load: () => Observable<any>): Observable<any> {
    return shouldPreload(route) ? load() : EMPTY;
  }
}

// avoid typing issues for now
declare var navigator;

export function shouldPreload(route: Route): boolean {
  const conn = navigator.connection;

  if (conn) {
    if (conn.saveData) {
      return false; // save dat mode is enabled, so dont preload
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

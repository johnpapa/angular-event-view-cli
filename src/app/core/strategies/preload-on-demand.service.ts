import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

export class PreloadOnDemandOptions {
  constructor(public routePath: string, public preload = true) {}
}

@Injectable({ providedIn: 'root' })
export class PreloadOnDemandService {
  private subject = new Subject<PreloadOnDemandOptions>();
  state = this.subject.asObservable();

  startPreload(routePath: string) {
    const message = new PreloadOnDemandOptions(routePath, true);
    this.subject.next(message);
  }
}

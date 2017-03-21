import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { ToastService } from './toast/toast.service';

@Injectable()
export class ExceptionService {
  constructor(private toastService: ToastService) { }

  catchBadResponse: (errorResponse: any) => Observable<any> = (errorResponse: any) => {
    const res = <Response>errorResponse;
    const err = res.json();
    const emsg = err ?
      (err.error ? err.error : JSON.stringify(err)) :
      (res.statusText || 'unknown error');
    this.toastService.activate(`Error - Bad Response - ${emsg}`);
    // return Observable.throw(emsg); // TODO: We should NOT swallow error here.
    return Observable.of(false);
  }
}

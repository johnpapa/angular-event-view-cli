import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { ToastService } from './toast/toast.service';

@Injectable()
export class ExceptionService {
  constructor(private toastService: ToastService) { }

  catchBadResponse: (errorResponse: any) => Observable<any> = (errorResponse: any) => {
    const err = <HttpErrorResponse>errorResponse;
    const emsg = err ?
      (err.error ? err.error : JSON.stringify(err)) :
      (err.statusText || 'unknown error');
    this.toastService.activate(`Error - Bad Response - ${emsg}`);
    // return Observable.throw(emsg); // TODO: We should NOT swallow error here.
    return Observable.of(false);
  }
}

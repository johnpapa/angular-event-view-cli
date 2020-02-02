import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { Speaker } from '../models';

export class TransformResponseInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const started = Date.now();
    return next.handle(req).pipe(
      map(event => {
        if (event instanceof HttpResponse) {
          if (event.url.indexOf('speakers') && Array.isArray(event.body)) {
            let body = event.body.map(speaker => {
              if (speaker.name.match(/rey/i)) {
                speaker.name = 'Rey Skywalker';
              }
              return speaker;
            });
            return event.clone({ body });
          }
        }
      }),
      tap(event => {
        if (event instanceof HttpResponse) {
          const elapsed = Date.now() - started;
          console.log(`HTTP: Request for ${req.urlWithParams} took ${elapsed} ms.`);
        }
      })
    );
  }
}

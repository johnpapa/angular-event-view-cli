import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthService } from '../auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Get the auth header from the service.
    const authHeader = this.auth.getAuthorizationHeader();
    // Clone the request to add the new header.
    const httpHeaders = req.headers
      .append('Authorization', authHeader)
      .append('Content-Type', 'application/json');
    const authReq = req.clone({ headers: httpHeaders });
    console.log(`HTTP: Adding headers`);
    // Pass on the cloned request instead of the original request.
    return next.handle(authReq);
  }
}

/**
 * Most interceptors transform the outgoing request before passing it to the next interceptor in the chain, by calling next.handle(transformedReq). An interceptor may transform the response event stream as well, by applying additional RxJS operators on the stream returned by next.handle().
 *
 * To use the same instance of HttpInterceptors for the entire app, import the HttpClientModule only in your AppModule, and add the interceptors to the root application injector . If you import HttpClientModule multiple times across different modules (for example, in lazy loading modules), each import creates a new copy of the HttpClientModule, which overwrites the interceptors provided in the root module.
 *
 */

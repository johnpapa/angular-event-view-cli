import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { CSRFInterceptor } from './csrf.interceptor';
import { TransformResponseInterceptor } from './transform-response.interceptor';
import { LogResponseTimeInterceptor } from './log-response.interceptor';
import { LogHeadersInterceptor } from './log-headers.interceptor';
import { EnsureSSLInterceptor } from './ensure-ssl.interceptor';

export * from './auth.interceptor';
export * from './csrf.interceptor';
export * from './ensure-ssl.interceptor';
export * from './log-headers.interceptor';
export * from './log-response.interceptor';
export * from './transform-response.interceptor';

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: EnsureSSLInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: CSRFInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: TransformResponseInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: LogResponseTimeInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: LogHeadersInterceptor, multi: true }
];

/**
 * https://angular.io/guide/http#http-interceptors
 *
 * HTTP Interception is a major feature of @angular/common/http. With interception, you declare interceptors that inspect and transform HTTP requests from your application to the server. The same interceptors may also inspect and transform the server's responses on their way back to the application. Multiple interceptors form a forward-and-backward chain of request/response handlers.
 *

 * Interceptors can perform a variety of implicit tasks, from authentication to logging, in a routine, standard way, for every HTTP request/response.

 * Without interception, developers would have to implement these tasks explicitly for each HttpClient method call.

 * Because interceptors are (optional) dependencies of the HttpClient service, you must provide them in the same injector (or a parent of the injector) that provides HttpClient. Interceptors provided after DI creates the HttpClient are ignored.


 * Most interceptors transform the outgoing request before passing it to the next interceptor in the chain, by calling next.handle(transformedReq). An interceptor may transform the response event stream as well, by applying additional RxJS operators on the stream returned by next.handle().
 *
 * To use the same instance of HttpInterceptors for the entire app, import the HttpClientModule only in your AppModule, and add the interceptors to the root application injector . If you import HttpClientModule multiple times across different modules (for example, in lazy loading modules), each import creates a new copy of the HttpClientModule, which overwrites the interceptors provided in the root module.
 *
 * Note the multi: true option. This required setting tells Angular that HTTP_INTERCEPTORS is a token for a multiprovider that injects an array of values, rather than a single value.
 *
 * Angular applies interceptors in the order that you provide them. If you provide interceptors A, then B, then C, requests will flow in A->B->C and responses will flow out C->B->A.



 */

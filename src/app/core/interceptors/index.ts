import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { CSRFInterceptor } from './csrf.interceptor';
import { TransformResponseInterceptor } from './transform-response.interceptor';
import { LogResponseTimeInterceptor } from './log-response.interceptor';
import { LogHeadersInterceptor } from './log-headers.interceptor';

export * from './auth.interceptor';
export * from './log-headers.interceptor';
export * from './log-response.interceptor';

export const interceptors = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: CSRFInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: TransformResponseInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: LogResponseTimeInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: LogHeadersInterceptor, multi: true }
];

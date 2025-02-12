import { LoggingInterceptorService } from './services/logging-interceptor.service';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthInterceptorService } from './services/auth-interceptor.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    // {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService , multi: true}
    provideHttpClient(withInterceptors([AuthInterceptorService , LoggingInterceptorService]))
  ],
};

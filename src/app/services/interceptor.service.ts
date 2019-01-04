import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler
} from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(request, next) {
    if (this.authService.isLoggedIn()) {
      request = request.clone({
        headers: request.headers.set(
          'Authorization',
          `Bearer ${this.authService.getToken()}`
        )
      });
    }

    return next.handle(request).pipe(
      catchError(error => {
        return throwError(error);
      })
    );
  }
}

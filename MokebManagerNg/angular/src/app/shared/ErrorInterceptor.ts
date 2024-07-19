import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'An unknown error occurred!';

        if (error.error instanceof ErrorEvent) {
          // Client-side error
          errorMessage = `Client-side error: ${error.error.message}`;
        } else {
          // Server-side error
          if (error.status === 0) {
            errorMessage = 'Could not connect to the server. Please try again later.';
          } else {
            errorMessage = `Server-side error: ${error.status} ${error.message}`;
          }
        }

        var baseUrl = environment.apis.default.url;
        window.open(baseUrl, '_blank');

        // Here you can log the error to the console or send it to your backend server
        console.error(errorMessage);

        // Optionally, display a user-friendly error message to the user
        alert(
          `از روشن بودن هاست اطمینان حاصل کنید سپس صفحه را Refresh کنید.\nلینک زیر را در یک صفحه دیگر باز کنید:\n${baseUrl}`
        );

        return throwError(() => new Error(errorMessage));
      })
    );
  }
}

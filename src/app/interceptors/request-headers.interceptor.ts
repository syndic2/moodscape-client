import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpHandler, HttpEvent, HttpRequest, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable()
export class RequestHeadersInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      responseType: 'json'
    });

    if (request.method === 'POST') {
      request = request.clone({
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          ...request.headers.has('skipLoading') && { 'skipLoading': 'true' }
        })
      });
    }

    return next.handle(request);
  }
}


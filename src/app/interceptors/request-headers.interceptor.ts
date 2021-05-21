import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpHandler, HttpEvent, HttpRequest, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable()
export class RequestHeadersInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req= req.clone({
      responseType: 'json'
    });

    if (req.method === 'POST') {
      req= req.clone({
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        })
      });
    }

    return next.handle(req);
  }
}


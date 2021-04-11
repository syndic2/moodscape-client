import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpEvent, HttpRequest } from '@angular/common/http';

import { LoadingController } from '@ionic/angular';

import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable()
export class HttpLoadingInterceptor implements HttpInterceptor {

  constructor(private loadingController: LoadingController) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const loading= this.loadingController.create({
      message: 'Mohon tunggu... :)',
      translucent: true
    });

    this.loadingController.getTop().then(hasLoading => {
      if (!hasLoading) {
        loading.then(loader => loader.present())
      }
    })

    return next.handle(request).pipe(
      finalize(() => loading.then(loader => loader.dismiss()))
    );
  }
}

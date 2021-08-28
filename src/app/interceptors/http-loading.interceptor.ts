import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpEvent, HttpRequest, HttpErrorResponse } from '@angular/common/http';

import { LoadingController, ToastController } from '@ionic/angular';

import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

@Injectable()
export class HttpLoadingInterceptor implements HttpInterceptor {

	constructor(private loadingController: LoadingController, private toastController: ToastController) { }

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('skip loading', request.headers.has('skipLoading'));

    const loading = this.loadingController.create({
			message: 'Mohon tunggu... :)',
			translucent: true
		});

    if (!request.headers.has('skipLoading')) {
      console.log('loading not skipped');

      this.loadingController.getTop().then(hasLoading => {
        if (!hasLoading) {
          loading.then(loader => loader.present());
        }
      });
    }

		return next.handle(request).pipe(
			catchError(error => {
				if (error instanceof HttpErrorResponse) {
          this.HANDLE_ERROR_REQUEST(error);
				}

				return throwError(error);
			}),
			finalize(() => loading.then(loader => loader.dismiss()))
		);
	}

	private async HANDLE_ERROR_REQUEST(error: HttpErrorResponse) {
    const toast= await this.toastController.create({ position: 'bottom', duration: 1500 });

    switch (error.status) {
      case 400:
        toast.message= 'Terjadi kesalahan saat melakukan request, silahkan coba kembali'
        break;

      case 404:
        toast.message= 'Terjadi kesalahan pada URL API, silahkan coba kembali';
        break;

      default:
        return throwError(error);
    }

    toast.present();
	}
}

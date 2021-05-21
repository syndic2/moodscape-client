import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpEvent, HttpRequest, HttpErrorResponse } from '@angular/common/http';

import { LoadingController, ToastController } from '@ionic/angular';

import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

@Injectable()
export class HttpLoadingInterceptor implements HttpInterceptor {

	constructor(private loadingController: LoadingController, private toastController: ToastController) { }

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		const loading = this.loadingController.create({
			message: 'Mohon tunggu... :)',
			translucent: true
		});

		this.loadingController.getTop().then(hasLoading => {
			if (!hasLoading) {
				loading.then(loader => loader.present());
			}
		})

		return next.handle(request).pipe(
			catchError(error => {
				if (error instanceof HttpErrorResponse) {
					switch (error.status) {
						case 400:
							this.HANDLE_BAD_REQUEST();
							break;

						default:
							return throwError(error);
					}
				}

				return throwError(error);
			}),
			finalize(() => loading.then(loader => loader.dismiss()))
		);
	}

	private async HANDLE_BAD_REQUEST() {
		const toast = await this.toastController.create({
			message: 'Terjadi kesalahan saat melakukan request, silahkan coba kembali',
			position: 'top',
			duration: 2000
		});

		toast.present();
	}
}

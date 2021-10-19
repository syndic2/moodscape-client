import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpEvent, HttpRequest, HttpErrorResponse } from '@angular/common/http';

import { LoadingController, ToastController } from '@ionic/angular';

import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { ModalService } from '../services/modal/modal.service';

@Injectable()
export class HttpLoadingInterceptor implements HttpInterceptor {

	constructor(
    private loadingController: LoadingController, 
    private modalService: ModalService
  ) { }

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //console.log('skip loading', request.headers.has('skipLoading'));

    const loading = this.loadingController.create({
			message: 'Mohon tunggu... :)',
			translucent: true
		});

    if (!request.headers.has('skipLoading') && !request.url.includes(`${environment.rasaChatbot}`)) {
      //console.log('loading not skipped');

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
    switch (error.status) {
      case 0:
        this.modalService.requestError(error.statusText)
        break;
      
      case 400:
        this.modalService.requestError('Terjadi kesalahan saat melakukan request, silahkan coba kembali');
        break;
      
      case 401:
        this.modalService.requestError('Pengguna tidak terotorisasi, sialhkan coba kembali');
        break;

      case 404:
        this.modalService.requestError('Terjadi kesalahan pada URL API, silahkan coba kembali');
        break;
      
      case 500:
        this.modalService.requestError('Terjadi kesalahan pada server, silahkan coba kembali');
        break;

      default:
        return throwError(error);
    }
	}
}

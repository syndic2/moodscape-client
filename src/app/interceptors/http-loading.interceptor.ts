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
    const loading = this.loadingController.create({
      message: 'Memuat...',
      translucent: true
    });

    if (!request.headers.has('skipLoading') && !request.url.includes(`${environment.rasaChatbot}`)) {
      loading.then(loader => loader.present());

      // this.loadingController.getTop().then(hasLoading => {
      //   if (!hasLoading) {
      //     loading.then(loader => loader.present());
      //   }
      // });

      // (async () => {
      //   const isLoading = await this.loadingController.getTop();

      //   if (!isLoading) {
      //     (await loading).present();
      //   }
      // })();
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

  private async HANDLE_ERROR_REQUEST(response: HttpErrorResponse) {
    switch (response.status) {
      case 0:
        await this.modalService.requestError(response.statusText)
        break;

      case 400:
        await this.modalService.requestError('Terjadi kesalahan saat melakukan request, silahkan coba kembali');
        break;

      case 401:
        await this.modalService.requestError('Pengguna tidak terotorisasi, sialhkan coba kembali');
        break;

      case 404:
        await this.modalService.requestError('Terjadi kesalahan pada URL API, silahkan coba kembali');
        break;

      case 500:
        await this.modalService.requestError(response.error.message);
        break;

      default:
        return throwError(response);
    }
  }
}

import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpEvent, HttpRequest, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { ToastController } from '@ionic/angular';

import { Observable, throwError } from 'rxjs';
import { catchError, finalize, map, switchMap } from 'rxjs/operators';

import { AuthenticationService } from '../services/authentication/authentication.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(
    private toastController: ToastController,
    private authService: AuthenticationService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.isBlockedUrl(request.url)) {
      return next.handle(request);
    } else {
      return next.handle(this.attachToken(request)).pipe(
        catchError(error => {
          if (error instanceof HttpErrorResponse) {
            switch (error.status) {
              case 400:
                this.HANDLE_400_ERROR();
                break;

              default:
                return throwError(error);
            }
          }

          return throwError(error);
        }),
        map((res: any) => {
          if (res.body) {
            const data= res.body.data;

            if ((data.userProfile && data.userProfile.__typename === 'AuthInfoField') ||
                (data.updateProfile && data.updateProfile.__typename === 'AuthInfoField')) {
              console.log('token need to be refreshed');

              return this.authService.refreshToken().subscribe(async newToken => {
                console.log('finish refreshed');
                console.log('new token', newToken);

                const toast= await this.toastController.create({
                  message: 'Segarkan halaman ini. Tarik kebawah.',
                  duration: 2000
                });
                toast.present();

                return next.handle(this.attachToken(request));
              });
            } else {
              console.log('token no need to be refresh');

              return res;
            }
          }
        })
      );
    }
  }

  private async HANDLE_400_ERROR() {
    const toast= await this.toastController.create({
      message: 'Terjadi kesalahan pada server. Silahkan coba kembali.',
      duration: 2000
    });

    toast.present();
  }

  private isBlockedUrl(url: string): Boolean {
    if (url === `${environment.api_url}/auth`) {
      return true;
    } else {
      return false;
    }
  }

  private attachToken(request: HttpRequest<any>) {
    console.log('user already setted token', this.authService.getUser());

    if (!this.authService.getUser()) {
      return request;
    } else {
      return request.clone({
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.authService.getUser()}`
        })
      });
    }
  }
}


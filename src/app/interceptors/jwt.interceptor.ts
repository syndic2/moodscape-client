import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpEvent, HttpRequest, HttpHeaders } from '@angular/common/http';

import { ToastController } from '@ionic/angular';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
        map((res: any) => {
          if (res.body) {
            const data= res.body.data;
            const isTokenExpired= (data.userProfile && data.userProfile.__typename === 'AuthInfoField') ||
                                  (data.updateProfile && data.updateProfile.__typename === 'AuthInfoField')

            if (!isTokenExpired) {
              console.log('token no need to be refresh');

              return res;
            } else {
              console.log('token need to be refreshed');

              return this.authService.refreshToken().subscribe(async newToken => {
                console.log('finish refreshed');
                console.log('new token', newToken);

                const toast= await this.toastController.create({
                  message: 'Segarkan halaman ini. Tarik kebawah.',
                  position: 'top',
                  duration: 2000
                });
                toast.present();

                return next.handle(this.attachToken(request));
              });
            }
          }
        })
      );
    }
  }

  private isBlockedUrl(url: string): Boolean {
    if (url === `${environment.api_url}/auth`) {
      return true;
    }

    return false;
  }

  private attachToken(request: HttpRequest<any>) {
    console.log('user already setted token', this.authService.getUser());

    if (!this.authService.getUser()) {
      return request;
    }

    return request.clone({
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.authService.getUser()}`
      })
    });
  }
}


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
          return this.reAuthenticate(request, next, res);
        })
      );
    }
  }

  private reAuthenticate(request: HttpRequest<any>, next: HttpHandler, res: any) {
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
          console.log('finish refreshing token');
          console.log('new token', newToken);

          this.authService.finishRefreshToken.next(true);

          const toast= await this.toastController.create({
            message: 'Tarik kebawah untuk segarkan halaman ini',
            position: 'top',
            duration: 2000
          });
          toast.present();
        });

        /*return this.authService.refreshToken().pipe(
          map((res: any) => {
            console.log('mapped here');

            return res.data.refreshAuth.newToken;
          }),
          switchMap(newToken => {
            console.log('finish refreshing token');
            console.log('new token', newToken);

            return this.authService.storeAccessToken(newToken).pipe(
              switchMap(() => {
                console.log('retrying request after stored');

                return next.handle(this.attachToken(request));
              }) 
            )
          })
        );*/
      }
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


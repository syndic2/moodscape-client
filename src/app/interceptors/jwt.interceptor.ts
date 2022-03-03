import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { UtilitiesService } from '../services/utilities/utilities.service';
import { ModalService } from '../services/modal/modal.service';
import { AuthenticationService } from '../services/authentication/authentication.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(
    private utilitiesService: UtilitiesService,
    private modalService: ModalService,
    private authService: AuthenticationService,
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.url === `${environment.apiUrl}/auth` ||
      request.url.includes(`${environment.apiUrl.replace('/api', '')}/services/telegram`) ||
      request.url.includes(`${environment.apiUrl.replace('/api', '')}/services/fcm`) ||
      request.url.includes(`${environment.rasaChatbot}`)
    ) {
      return next.handle(request);
    } else {
      return this.authService.getToken().pipe(
        switchMap(token => {
          return next.handle(this.attachToken(request, token)).pipe(
            map((response: any) => {
              return this.reAuthenticate(response);
            })
          );
        })
      );
    }
  }

  private reAuthenticate(response: any) {
    if (response.body) {
      this.utilitiesService.onSkeletonLoading.next(true);

      const data = response.body.data;
      const resolver = data[Object.keys(data)[0]]
      let isTokenExpired: boolean = false

      if (resolver === undefined || resolver === null) {
        isTokenExpired = true;
      } else {
        if (resolver.hasOwnProperty('__typename')) {
          if (resolver.__typename === 'AuthInfoField') {
            isTokenExpired = true;
          } else {
            isTokenExpired = false;
          }
        } else {
          isTokenExpired = false;
        }
      }

      if (isTokenExpired === false) { //CHECK IF NOT EXPIRED
        this.utilitiesService.onSkeletonLoading.next(false);
        //console.log('token no need to be refresh', isTokenExpired);

        return response;
      } else {
        //console.log('token need to be refresh', isTokenExpired);

        //return this.authService.refreshToken().subscribe(async newToken => {
        //	//console.log('finish refreshing token');
        //	//console.log('new token', newToken);
        //
        //  this.modalService.requestError('Gagal validasi otentikasi, silahkan dicoba lagi');
        //});

        this.modalService.requestError('Gagal validasi otentikasi, silahkan dicoba lagi');

        return this.authService.refreshToken();
      }
    }
  }

  private attachToken(request: HttpRequest<any>, token: string) {
    if (!token) {
      return request;
    }

    return request.clone({
      headers: request.headers.set('Authorization', `Bearer ${token}`)
    });
  }
}


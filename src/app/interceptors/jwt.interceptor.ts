import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpEvent, HttpRequest } from '@angular/common/http';

import { ToastController } from '@ionic/angular';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { UtilitiesService } from '../services/utilities/utilities.service';
import { AuthenticationService } from '../services/authentication/authentication.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

	constructor(
		private toastController: ToastController,
    private utilitiesService: UtilitiesService,
		private authService: AuthenticationService,
	) { }

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		if (req.url === `${environment.apiUrl}/auth` || req.url.includes(`${environment.rasaChatbot}`)) {
			return next.handle(req);
		} else {
			return next.handle(this.attachToken(req)).pipe(
				map((res: any) => {
					return this.reAuthenticate(req, res, next);
				})
			);
		}
	}

	private reAuthenticate(req: HttpRequest<any>, res: any, next: HttpHandler) {
		if (res.body) {
      this.utilitiesService.onSkeletonLoading.next(true);

			const data = res.body.data;
      const resolver= data[Object.keys(data)[0]]
			let isTokenExpired: boolean= false;

      console.log('body', res.body);
      console.log('resolver', resolver);

      if (resolver === undefined || resolver === null) {
        isTokenExpired= true;
      } else {
        if (resolver.hasOwnProperty('__typename')) {
          if (resolver.__typename === 'AuthInfoField') {
            isTokenExpired= true;
          } else {
            isTokenExpired= false;
          }
        } else {
          isTokenExpired= false;
        }
      }

			if (isTokenExpired === false) { //CHECK IF NOT EXPIRED
        this.utilitiesService.onSkeletonLoading.next(false);
				console.log('token no need to be refresh', isTokenExpired);

				return res;
			} else {
				console.log('token need to be refresh', isTokenExpired);

				return this.authService.refreshToken().subscribe(async newToken => {
					console.log('finish refreshing token');
					console.log('new token', newToken);

					const toast = await this.toastController.create({
						message: 'Gagal validasi otentikasi, silahkan dicoba lagi',
						position: 'bottom',
						duration: 2000
					});
					toast.present();
				});
			}
		}
	}

	private attachToken(req: HttpRequest<any>) {
		console.log('user already setted token', this.authService.userData.getValue());

		if (!this.authService.userData.getValue()) {
			return req;
		}

		return req.clone({
			headers: req.headers.set('Authorization', `Bearer ${this.authService.userData.getValue()}`)
		});
	}
}


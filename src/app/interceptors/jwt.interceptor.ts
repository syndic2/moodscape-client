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
	) { }

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		if (req.url === `${environment.apiUrl}/auth`) {
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
			const data = res.body.data;
      let response= null;
			let isTokenExpired: boolean= false;

      //GET FIRST RESPONSE TO CHECK AUTH
      if (req.method === 'POST') {
        const mutation = data[Object.keys(data)[0]];
        response= mutation ? mutation[Object.keys(mutation)[0]] : null; //NEED THIS, BECAUSE IF TOKEN IS NULL THEN THE RETURN IS NULL
      } else if (req.method === 'GET') {
        response = data[Object.keys(data)[0]];
      }

      //IF NULL, SET TO TRUE ELSE SET TO TRUE/FALSE
      isTokenExpired = response !== null ? response && (response.__typename && response.__typename === 'AuthInfoField') : true;

			if (!isTokenExpired) { //CHECK IF FALSE OR UNDEFINED
				console.log('token no need to be refresh', isTokenExpired);

				return res;
			} else {
				console.log('token need to be refresh', isTokenExpired);

				return this.authService.refreshToken().subscribe(async newToken => {
					console.log('finish refreshing token');
					console.log('new token', newToken);

					const toast = await this.toastController.create({
						message: 'Silahkan dicoba lagi',
						position: 'top',
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


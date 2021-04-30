import { Injectable } from '@angular/core';
import { CanLoad, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';

import { AlertController } from '@ionic/angular';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Injectable({
	providedIn: 'root'
})
export class AuthenticationGuard implements CanLoad {
	/*canActivate(
	  route: ActivatedRouteSnapshot,
	  state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
	  return true;
	}*/

	constructor(
		private router: Router,
		private alertController: AlertController,
		private authService: AuthenticationService,
	) { }

	canLoad(): Observable<boolean> {
		return this.authService.authenticate.pipe(
			map(authenticated => {
				if (!authenticated) {
					this.alertController.create({
						header: 'Hak akses tidak terotorisasi',
						message: 'Anda belum login atau tidak memliki hak untuk mengakses halaman ini',
						buttons: ['OK']
					}).then(alert => alert.present());
					this.router.navigate(['/'], { replaceUrl: true });

					return false;
				} else {
					return true;
				}
			})
		);
	}
}

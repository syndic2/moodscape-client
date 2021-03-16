import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';

import { AlertController } from '@ionic/angular';

import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';

import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
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

  canActivate(): Observable<boolean> {
    return this.authService.user.pipe(
      take(1),
      map(user => {
        if (!user) {
          this.alertController.create({
            header: 'Hak akses tidak terotorisasi',
            message: 'Anda tidak memliki hak untuk mengakses halaman ini.',
            buttons: ['OK']
          }).then(alert => alert.present());
          this.router.navigate(['/']);

          return false;
        }

        console.log('it can activate: ', user);

        return true;
      })
    );
  }
}

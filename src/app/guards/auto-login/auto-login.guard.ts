import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Injectable({
	providedIn: 'root'
})
export class AutoLoginGuard implements CanLoad {
	/*canLoad(
	  route: Route,
	  segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
	  return true;
	}*/

	constructor(private router: Router, private authService: AuthenticationService) { }

	canLoad(): Observable<boolean> {
		return this.authService.authenticate.pipe(
			map(authenticated => {
				if (!authenticated) {
					return true;
				} else {
					this.router.navigate(['/side-menu'], { replaceUrl: true });
				}
			})
		);
	}
}

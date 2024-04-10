import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import AuthenticationService from '@shared/services/authentication.service';
import { map } from 'rxjs';

export const canActivateGuard: CanActivateFn = (
	route: ActivatedRouteSnapshot,
	state: RouterStateSnapshot
) => {

	const router = inject(Router);

	return inject(AuthenticationService).validateToken().pipe(
		map(authenticated => {

			console.log("tentou", authenticated);

			if (!authenticated) {
				router.navigate(["/login"]);
			}

			return authenticated;
		})
	)
};
import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import AuthenticationService from '@shared/services/authentication.service';
import { tap } from 'rxjs';

export const canActivateGuard: CanActivateFn = (
	route: ActivatedRouteSnapshot,
	state: RouterStateSnapshot
) => {

	const router = inject(Router);
	const authService = inject(AuthenticationService);

	if (authService.isLoggedIn)
		return true;

	return authService.validateToken().pipe(
		tap(authenticated => {
			if (!authenticated) {
				router.navigate(["/login"]);
			}
		})
	)
};


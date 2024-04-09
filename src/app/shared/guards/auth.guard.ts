import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import AuthenticationService from '@shared/services/authentication.service';

export const canActivateGuard: CanActivateFn = (
	route: ActivatedRouteSnapshot,
	state: RouterStateSnapshot
) => {
	const authenticated = inject(AuthenticationService).isLoggedIn;

	if (!authenticated) {
		inject(Router).navigate(["/login"]);
	}

	return authenticated;
};
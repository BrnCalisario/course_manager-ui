
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import StorageService from '@shared/services/storage.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

	const authToken = inject(StorageService).getItem('token');

	if (!authToken)
		return next(req);

	const authReq = req.clone({
		setHeaders: {
			Authorization: `Bearer ${authToken}`,
		}
	})

	return next(authReq);
};

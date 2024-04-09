
import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
	const authToken = sessionStorage.getItem('token');

	if (!authToken)
		return next(req);

	const authReq = req.clone({
		setHeaders: {
			Authorization: `Bearer ${authToken}`,
		}
	})

	return next(authReq);
};

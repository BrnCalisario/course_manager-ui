import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const authToken = sessionStorage.getItem('token');

        if (!authToken)
            return next.handle(req);

        const authReq = req.clone({
            setHeaders: {
                Authorization: `Bearer ${authToken}`,
            }
        })

        return next.handle(authReq);
    }

}
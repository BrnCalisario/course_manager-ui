import { Observable, of } from 'rxjs';
import { tryObservable } from 'src/utils/observable/try-observable';

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthEndpoint } from '@domain/auth/auth.endpoint';
import { TokenInfo } from '@domain/auth/auth.models';
import { UserEndpoint } from '@domain/user/user.endpoint';
import { LoginDto, RegisterDto } from '@domain/user/user.model';

@Injectable({ providedIn: 'root' })
export default class AuthenticationService {

	public get isLoggedIn(): boolean {
		return this._isLoggedIn;
	}

	private _isLoggedIn: boolean = false;

	constructor(
		private readonly router: Router,
		private readonly authEndpoint: AuthEndpoint,
		private readonly userEndpoint: UserEndpoint
	) { }

	public register(registerData: RegisterDto): Observable<boolean> {
		return tryObservable(this.userEndpoint.create(registerData));
	}

	public login(loginData: LoginDto): Observable<boolean> {
		return tryObservable(this.authEndpoint.login(loginData), (res => {

			this._isLoggedIn = true;
			this.setToken(res);

			return true;
		}))

	}

	public logout(): void {
		this._isLoggedIn = false;
		this.clearSession();
	}

	public validateToken(): Observable<boolean> {

		var token = undefined;

		try {
			token = sessionStorage.getItem('token');
		} catch {
			return of(false);
		}

		if (!token) return of(false);

		return tryObservable(this.authEndpoint.validate(token), (res => {

			this._isLoggedIn = true;
			this.setToken(res);

			return true;
		}));

	}

	private setToken(token: TokenInfo) {
		sessionStorage.setItem('token', token.token);
		sessionStorage.setItem('expiresAt', new Date(token.expiresAt).toLocaleString());
	}

	private clearSession() {
		sessionStorage.removeItem('token');
		sessionStorage.removeItem('expiresAt');
	}
}

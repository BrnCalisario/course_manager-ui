import { Observable, of } from 'rxjs';
import { tryObservable } from 'src/utils/observable/try-observable';

import { Injectable } from '@angular/core';
import { AuthEndpoint } from '@domain/auth/auth.endpoint';
import { UserEndpoint } from '@domain/user/user.endpoint';
import { LoginDto, RegisterDto } from '@domain/user/user.model';
import StorageService from './storage.service';

@Injectable({ providedIn: 'root' })
export default class AuthenticationService {

	private _isLoggedIn: boolean = false;

	constructor(
		private readonly authEndpoint: AuthEndpoint,
		private readonly userEndpoint: UserEndpoint,
		private readonly storageService: StorageService
	) {
	}

	public get isLoggedIn(): boolean {
		return this._isLoggedIn;
	}

	public register(registerData: RegisterDto): Observable<boolean> {
		return tryObservable(this.userEndpoint.create(registerData));
	}

	public login(loginData: LoginDto): Observable<boolean> {
		return tryObservable(this.authEndpoint.login(loginData), (res => {

			this._isLoggedIn = true;
			this.storageService.setToken(res);

			return true;
		}))
	}

	public logout(): void {
		this._isLoggedIn = false;
		this.storageService.clearToken();
	}

	public validateToken(): Observable<boolean> {

		const token = this.storageService.getItem('token');

		if (!token) return of(false);

		return tryObservable(this.authEndpoint.validate(token), (res => {

			this._isLoggedIn = true;
			this.storageService.setToken(res);

			return true;
		}));
	}
}

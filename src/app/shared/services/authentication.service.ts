import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthEndpoint } from '@domain/auth/auth.endpoint';
import { LoginDto, RegisterDto } from '@domain/user/user.model';

@Injectable({ providedIn: 'root' })
export default class AuthenticationService {

	public get isLoggedIn(): boolean {
		return this._isLoggedIn;
	}

	private _isLoggedIn: boolean = false;

	constructor(private readonly router: Router, private readonly authEndpoint: AuthEndpoint) { }

	public register(registerData: RegisterDto) {
		return this.authEndpoint.register(registerData);
	}

	public login(loginData: LoginDto) {
		return this.authEndpoint.login(loginData)
			.subscribe({
				next: (res) => {
					console.log(res)
					sessionStorage.setItem('token', res.token);
					this._isLoggedIn = true;
					this.router.navigate(["/home"]);
				},
				error: (err) => {
					//TODO: Feedback with toast
				}
			})
	}

	public logout() {
		sessionStorage.removeItem('token');
		this._isLoggedIn = false;
	}
}

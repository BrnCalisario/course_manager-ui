import { Injectable } from "@angular/core";
import { UserEndpoint } from "@domain/user/user.endpoint";
import { LoginDto, RegisterDto } from "@domain/user/user.model";

@Injectable({ providedIn: 'root' })
export default class AuthenticationService {

	constructor(private readonly endpoint: UserEndpoint) { }

	public register(registerData: RegisterDto) {
		this.endpoint.create(registerData);
	}

	public login(loginData: LoginDto) {
		this.endpoint.login(loginData)
			.subscribe({
				next: (res) => {
					sessionStorage.setItem('token', res);
				},
				error: (err) => {
					//TODO: Feedback with toast
				}
			})
	}
}

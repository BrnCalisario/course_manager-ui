import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import AuthenticationService from '@shared/services/authentication.service';
import { SharedModule } from '@shared/shared.module';

@Component({
	selector: 'app-login',
	standalone: true,
	imports: [SharedModule],
	templateUrl: './login.component.html',
	styleUrl: './login.component.scss'
})
export class LoginComponent {

	public isLogin: boolean = true;

	public hidePassword: boolean = true;

	public loginForm: FormGroup = new FormGroup({
		Email: new FormControl('', [Validators.required, Validators.email]),
		Password: new FormControl('', [Validators.required]),
	})

	public registerForm: FormGroup = new FormGroup({
		UserName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
		Email: new FormControl('', [Validators.required, Validators.email]),
		Password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(30)])
	})

	constructor(private readonly authService: AuthenticationService) { }


	public login() {
		this.authService.login({ ...this.loginForm.value });
	}

	public register() {
		if (!this.registerForm.valid) return;

		this.authService.register({ ...this.registerForm.value })
			.subscribe({
				next: (res) => {
					this.isLogin = true;
					console.log(res)
				},
				error: (err) => {
					alert("Erro interno")
				}
			})
	}

	public toggleForm() {
		this.isLogin = !this.isLogin;
	}

}

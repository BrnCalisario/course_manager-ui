import { Component } from '@angular/core';
import AuthenticationService from '@shared/services/authentication.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(private readonly authService: AuthenticationService) {

  }

  public login() {
    this.authService.login({ Email: "brn@gmail.com", Password: "12345" });
  }
}

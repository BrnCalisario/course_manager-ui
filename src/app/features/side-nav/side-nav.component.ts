import { Component } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import AuthenticationService from '@shared/services/authentication.service';

import { SharedModule } from '../../shared/shared.module';

@Component({
	selector: 'app-side-nav',
	standalone: true,
	templateUrl: './side-nav.component.html',
	template: `<ng-content></ng-content>`,
	styleUrl: './side-nav.component.scss',
	imports: [SharedModule, MatSidenavModule, MatToolbarModule, MatIconButton]
})
export class SideNavComponent {

	constructor(
		private authService: AuthenticationService,
		private router: Router
	) { }

	public logout() {
		this.authService.logout();
		this.router.navigate(["/login"]);
	}
}


import { Component, OnInit } from '@angular/core';
import User from '@domain/user/user.model';

import UserService from '../../shared/services/user.service';
import { SharedModule } from '../../shared/shared.module';

@Component({
	selector: 'app-home-page',
	standalone: true,
	imports: [SharedModule],
	templateUrl: './home-page.component.html',
	styleUrl: './home-page.component.scss',
})
export class HomePageComponent implements OnInit {
	public users: User[] = [];

	constructor(service: UserService) {
	}

	ngOnInit(): void {
	}
}

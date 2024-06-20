import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BaseEndpoint } from '../base/base.endpoint';
import User from './user.model';

@Injectable({ providedIn: 'root' })
export class UserEndpoint extends BaseEndpoint<string, User> {
	override get route(): string {
		return '/odata/User';
	}

	constructor(protected override http: HttpClient) {
		super(http);
	}
}

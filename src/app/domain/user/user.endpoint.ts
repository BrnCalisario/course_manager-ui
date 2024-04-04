import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BaseEndpoint } from '../base/base.endpoint';
import User from './user.model';

@Injectable()
export class UserEndpoint extends BaseEndpoint<User, string> {
	override get route(): string {
		return '/odata/User';
	}

	constructor(protected override http: HttpClient) {
		super(http);
	}
}

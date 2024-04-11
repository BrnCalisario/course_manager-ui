import { Injectable } from '@angular/core';
import BaseService from '@domain/base/base.service';
import { UserEndpoint } from '@domain/user/user.endpoint';
import User from '@domain/user/user.model';

@Injectable({ providedIn: 'root' })
export default class UserService extends BaseService<string, User> {
	constructor(protected override endpoint: UserEndpoint) {
		super(endpoint)
	}
}

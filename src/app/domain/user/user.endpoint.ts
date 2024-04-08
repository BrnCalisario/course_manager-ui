import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { BaseEndpoint } from '../base/base.endpoint';
import User, { LoginDto } from './user.model';

@Injectable()
export class UserEndpoint extends BaseEndpoint<User, string> {
	override get route(): string {
		return '/odata/User';
	}

	constructor(protected override http: HttpClient) {
		super(http);
	}

	public login(loginDto: LoginDto): Observable<string> {
		return this.http.post<string>(`${this.baseURL}/api/User/login`, loginDto);
	}
}

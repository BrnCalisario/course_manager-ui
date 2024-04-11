import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BaseEndpoint } from '../base/base.endpoint';
import Module from './module.model';

@Injectable({ providedIn: 'root' })
export class ModuleEndpoint extends BaseEndpoint<string, Module> {
	override get route(): string {
		return "/api/Module";
	}

	constructor(protected override http: HttpClient) {
		super(http);
	}
}

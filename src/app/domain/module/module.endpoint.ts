import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BaseEndpoint } from '../base/base.endpoint';
import Module from './module.model';

@Injectable({ providedIn: 'root' })
export class ModuleEndpoint extends BaseEndpoint<number, Module> {
	override get route(): string {
		return "/odata/Module";
	}

	constructor(protected override http: HttpClient) {
		super(http);
	}
}

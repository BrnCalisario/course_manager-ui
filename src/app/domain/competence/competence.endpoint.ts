import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseEndpoint } from '@domain/base/base.endpoint';

import { Competence } from './competence.models';

@Injectable({ providedIn: 'root' })
export default class CompetenceEndpoint extends BaseEndpoint<number, Competence> {

	override get route(): string {
		return "/odata/Competence";
	}

	constructor(protected override http: HttpClient) {
		super(http);
	}
}

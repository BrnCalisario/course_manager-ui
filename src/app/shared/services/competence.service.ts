import { Injectable } from '@angular/core';
import BaseService from '@domain/base/base.service';
import CompetenceEndpoint from '@domain/competence/competence.endpoint';
import { Competence } from '@domain/competence/competence.models';

@Injectable({ providedIn: 'root' })
export default class CompetenceService extends BaseService<string, Competence> {
	constructor(protected override endpoint: CompetenceEndpoint) {
		super(endpoint)
	}
}

import { Injectable } from '@angular/core';
import BaseService from '@domain/base/base.service';
import CompetenceEndpoint from '@domain/competence/competence.endpoint';
import { Competence } from '@domain/competence/competence.models';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export default class CompetenceService extends BaseService<string, Competence> {
	constructor(protected override endpoint: CompetenceEndpoint) {
		super(endpoint)
	}

	save(competence: Competence, isEdit: boolean): Observable<Competence> {

		const method = isEdit ? this.endpoint.update.bind(this.endpoint) : this.endpoint.create.bind(this.endpoint);

		return method(competence);
	}
}

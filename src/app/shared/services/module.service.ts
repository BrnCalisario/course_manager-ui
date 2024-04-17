import { Injectable } from '@angular/core';
import BaseService from '@domain/base/base.service';
import { ModuleEndpoint } from '@domain/module/module.endpoint';
import Module from '@domain/module/module.model';

@Injectable({ providedIn: 'root' })
export default class ModuleService extends BaseService<number, Module> {
	constructor(protected override endpoint: ModuleEndpoint) {
		super(endpoint)
	}
}

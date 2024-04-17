import BaseEntity from '@domain/base/base.entity';
import { Competence } from '@domain/competence/competence.models';

export default class Module implements BaseEntity<string> {
	Id: string = '';
	Name: string = '';
	Description?: string = '';
	Objective: string = '';
	Workload: number = 0;
	Competences: Competence[] = [];
	Dependencies: Module[] = [];
	Dependents: Module[] = [];
}

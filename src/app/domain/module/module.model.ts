import BaseEntity from '@domain/base/base.entity';
import { Competence } from '@domain/competence/competence.models';

export default class Module implements BaseEntity<string> {
	Id: string = '';
	Name: string = 'Basic Python';
	Description?: string = '';
	Objective: string = 'Objectives';
	Workload: number = 10;
	Dependencies: Module[] | undefined = [];
	Competences: Competence[] | undefined = [];
}

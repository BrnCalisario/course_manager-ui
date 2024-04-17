import BaseEntity from '@domain/base/base.entity';
import { Competence } from '@domain/competence/competence.models';

export default class Module implements BaseEntity<number> {
	Id: number = 0;
	Name: string = 'Basic Python';
	Description?: string = '';
	Objective: string = 'Objectives';
	Workload: number = 10;
	Dependencies: Module[] | undefined = [];
	Competences: Competence[] | undefined = [];
}

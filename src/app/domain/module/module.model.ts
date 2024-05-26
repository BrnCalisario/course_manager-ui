import BaseEntity from '@domain/base/base.entity';
import { Competence } from '@domain/competence/competence.models';

export default class Module implements BaseEntity<number> {
	Id: number = 0;
	Name: string = '';
	Description: string = '';
	Objective: string = '';
	Workload: number = 0;
	Competences: Competence[] = [];
	Dependencies: Module[] = [];
	Dependents: Module[] = [];
	Color: string = '#AAEE33';
	Deleted: boolean = false;
	RemainingWorkload: number = 0;
}

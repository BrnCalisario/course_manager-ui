import BaseEntity from '@domain/base/base.entity';

export default class Module implements BaseEntity<string> {
	Id: string = '';
	Name: string = 'Basic Python';
	Description?: string = '';
	Objective: string = 'Objectives';
	Workload: number = 10;
	Dependencies: Module[] | undefined = [];
}

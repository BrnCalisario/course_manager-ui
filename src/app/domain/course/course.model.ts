import BaseEntity from '@domain/base/base.entity';
import Module from '@domain/module/module.model';

export default class Course implements BaseEntity<number> {
	constructor(name: string, description: string, modules: Module[]) {
		this.Name = name;
		this.Description = description;
		this.Modules = modules;
	}

	Id: number = 0;
	Name: string;
	Description: string;
	TotalWorkload: number = 0;
	Modules: Module[] = [];
	Deleted: boolean = false;
}

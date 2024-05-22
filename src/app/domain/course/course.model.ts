import BaseEntity from '@domain/base/base.entity';
import Module from '@domain/module/module.model';

export default class Course implements BaseEntity<number> {
	constructor(
		id: number,
		name: string,
		description: string,
		modules: Module[],
		color: string
	) {
		this.Id = id;
		this.Name = name;
		this.Description = description;
		this.Modules = modules;
		this.Color = color;
	}

	Id: number = 0;
	Name: string;
	Description: string;
	Modules: Module[] = [];
	Deleted: boolean = false;
	Color: string = '';
}

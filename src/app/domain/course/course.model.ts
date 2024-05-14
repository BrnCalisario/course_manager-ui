import BaseEntity from '@domain/base/base.entity';

export default class Course implements BaseEntity<number> {
	Id: number = 0;
	Name: string = '';
	TotalWorkload: number = 0;
	Description: string = '';
	Deleted: boolean = false;
}

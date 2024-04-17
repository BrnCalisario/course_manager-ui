import BaseEntity from '@domain/base/base.entity';

export class Competence implements BaseEntity<number> {
	Id: number = 0;
	Name: string = '';
}

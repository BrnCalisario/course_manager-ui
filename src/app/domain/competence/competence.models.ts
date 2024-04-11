import BaseEntity from '@domain/base/base.entity';

export class Competence implements BaseEntity<string> {
	Id: string = '';
	Name: string = '';
}

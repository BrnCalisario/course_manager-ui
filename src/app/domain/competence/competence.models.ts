import { BaseEntity } from "@domain/base/base.endpoint";

export class Competence implements BaseEntity<string> {
	Id: string = '';
	Name: string = '';
}

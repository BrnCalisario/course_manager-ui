import { BaseEntity } from "../base/base.endpoint";

export default class Course implements BaseEntity<string> {
    Id : string = '';
    Name : string = '';
    TotalWorkload : number = 0;
    Description ?: string;
}
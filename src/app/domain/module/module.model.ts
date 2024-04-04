import { BaseEntity } from "../base/base.endpoint";

export default class Module implements BaseEntity<string> {
    Id : string = '';
    Name : string = '';
    Description ?: string = '';
    Objectives ?: string = '';
    Workload : number = 0;
    Dependencies : Module[] | undefined = [];
}

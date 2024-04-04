import { Injectable } from "@angular/core";
import { BaseEndpoint } from "../base/base.endpoint";
import { HttpClient } from "@angular/common/http";
import Module from "./module.model";

@Injectable()
export class ModuleEndpoint extends BaseEndpoint<Module, string> {
    override get route(): string {
        return "/api/Module";
    }

    constructor(protected override http: HttpClient) {
        super(http);
    }
}
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BaseEndpoint } from '../base/base.endpoint';
import Course from './course.model';

@Injectable()
export class CourseEndpoint extends BaseEndpoint<Course, string>
{
    override get route(): string {
        return "/odata/Course";
    }

    constructor(protected override http : HttpClient) {
        super(http);
    }
}

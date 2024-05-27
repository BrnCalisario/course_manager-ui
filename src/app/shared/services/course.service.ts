import { Injectable } from '@angular/core';
import BaseService from '@domain/base/base.service';
import { CourseEndpoint } from '@domain/course/course.endpoint';
import Course from '@domain/course/course.model';

@Injectable({ providedIn: 'root' })
export default class CourseService extends BaseService<string, Course> {
	constructor(protected override endpoint: CourseEndpoint) {
		super(endpoint);
	}
}

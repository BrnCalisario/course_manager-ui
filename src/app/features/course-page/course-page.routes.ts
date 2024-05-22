import { Routes } from '@angular/router';

import CourseFormComponent from './pages/course-form/course-form.component';
import { CourseListComponent } from './pages/course-list/course-list.component';

export const courseRoutes: Routes = [
	{ path: '', redirectTo: '/course/list', pathMatch: 'full' },
	{ path: 'list', component: CourseListComponent },
	{ path: 'form', component: CourseFormComponent },
	{ path: 'form/:id', component: CourseFormComponent },
];

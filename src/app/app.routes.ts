import { Routes } from '@angular/router';
import { CoursePageComponent } from '@features/course-page/course-page.component';
import { courseRoutes } from '@features/course-page/course-page.routes';
import { HomePageComponent } from '@features/home-page/home-page.component';
import { LoginComponent } from '@features/login/login.component';
import { ModulePageComponent } from '@features/module-page/module-page.component';
import { moduleRoutes } from '@features/module-page/module-page.routes';

export const routes: Routes = [
	{ path: 'login', component: LoginComponent },
	{
		path: '', component: HomePageComponent, children: [
			{ path: 'course', component: CoursePageComponent, children: courseRoutes },
			{ path: 'module', component: ModulePageComponent, children: moduleRoutes }
		]
	},
	{ path: '**', redirectTo: '/', pathMatch: 'full' },

];

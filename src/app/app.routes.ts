import { Routes } from '@angular/router';
import { CoursePageComponent } from '@features/course-page/course-page.component';
import { courseRoutes } from '@features/course-page/course-page.routes';
import { HomePageComponent } from '@features/home-page/home-page.component';
import { LoginComponent } from '@features/login/login.component';
import { ModulePageComponent } from '@features/module-page/module-page.component';
import { moduleRoutes } from '@features/module-page/module-page.routes';
import { RootComponent } from '@features/root/root.component';
import { SchedulePageComponent } from '@features/schedule-page/schedule-page.component';
import { scheduleRoutes } from '@features/schedule-page/schedule-page.routes';

export const routes: Routes = [
	{
		path: '',
		// canActivate: [canActivateGuard],
		component: RootComponent,
		children: [
			{ path: '', redirectTo: 'home', pathMatch: 'full' },
			{ path: 'home', component: HomePageComponent },
			{
				path: 'course',
				component: CoursePageComponent,
				children: courseRoutes,
			},
			{
				path: 'module',
				component: ModulePageComponent,
				children: moduleRoutes,
			},
			{
				path: 'schedule',
				component: SchedulePageComponent,
				children: scheduleRoutes,
			},
		],
	},
	{ path: 'login', component: LoginComponent },
];

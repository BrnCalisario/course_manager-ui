import { Routes } from '@angular/router';
import { ClassPageComponent } from '@features/class-page/class-page.component';
import { classRoutes } from '@features/class-page/class-page.routes';
import { CoursePageComponent } from '@features/course-page/course-page.component';
import { courseRoutes } from '@features/course-page/course-page.routes';
import { HomePageComponent } from '@features/home-page/home-page.component';
import { LoginComponent } from '@features/login/login.component';
import { ModulePageComponent } from '@features/module-page/module-page.component';
import { moduleRoutes } from '@features/module-page/module-page.routes';
import { RootComponent } from '@features/root/root.component';
import { SchedulePageComponent } from '@features/schedule-page/schedule-page.component';
import { scheduleRoutes } from '@features/schedule-page/schedule-page.routes';
import { canActivateGuard } from '@shared/guards/auth.guard';

export const routes: Routes = [
	{
		path: '',
		canActivate: [canActivateGuard],
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
				path: 'classes',
				component: ClassPageComponent,
				children: classRoutes
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

import { Routes } from '@angular/router';

import { courseRoutes } from '@features/course-page/course-page.routes';
import { CoursePageComponent } from '@features/course-page/course-page.component';
import { ModulePageComponent } from '@features/module-page/module-page.component';
import { HomePageComponent } from '@features/home-page/home-page.component';
import { moduleRoutes } from '@features/module-page/module-page.routes';

export const routes: Routes = [
    { path: '', component: HomePageComponent },
    { path: 'course', component: CoursePageComponent, children: courseRoutes },
    { path: 'module', component: ModulePageComponent, children : moduleRoutes },
    { path: '**', redirectTo: '/', pathMatch: 'full' },
];

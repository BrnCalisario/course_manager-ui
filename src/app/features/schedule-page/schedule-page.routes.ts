import { Routes } from "@angular/router";
import { ScheduleMonthComponent } from "./components/schedule-month/schedule-month.component";
import { SchedulePageComponent } from "./components/schedule-page/schedule-page.component";

export const scheduleRoutes: Routes = [
	{ path: '', redirectTo: '/year', pathMatch: 'full' },
	{ path: 'year', component: SchedulePageComponent },
	{ path: 'month/:month', component: ScheduleMonthComponent }
]

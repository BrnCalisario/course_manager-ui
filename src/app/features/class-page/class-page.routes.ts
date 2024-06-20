import { Routes } from "@angular/router";
import { ClassListComponent } from "./pages/class-list/class-list.component";

export const classRoutes: Routes = [
	{ path: '', redirectTo: '/classes/list', pathMatch: 'full' },
	{ path: 'list', component: ClassListComponent },
]

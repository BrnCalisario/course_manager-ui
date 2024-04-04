import { Routes } from "@angular/router";
import { ModuleListComponent } from "./pages/module-list/module-list.component";
import ModuleFormComponent from "./pages/module-form/module-form.component";

export const moduleRoutes: Routes = [
    { path: '', redirectTo: '/module/list', pathMatch: 'full' },
    { path: 'list', component: ModuleListComponent },
    { path: 'form', component: ModuleFormComponent }
]
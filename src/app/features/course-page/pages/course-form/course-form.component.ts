import { Component } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import Module from "@domain/module/module.model";
import EditableHeader from "@features/course-page/components/editable-header/editable-header.component";
import { ModuleListDialogComponent } from "@features/course-page/components/module-list-dialog/module-list-dialog.component";
import { SharedModule } from "@shared/shared.module";

@Component({
	selector: 'app-course-form',
	standalone: true,
	imports: [SharedModule, EditableHeader],
	templateUrl: './course-form.component.html',
	styleUrl: './course-form.component.scss'
})
export default class CourseFormComponent {

	constructor(private readonly dialog: MatDialog) {

	}

	public modules: Module[] = [new Module(), new Module(), new Module()];

	public formatModule(module: Module): string {
		return `${module.Name} - Workload: ${module.Workload} h`;
	}

	public openModuleListDialog() {
		const dialogRef = this.dialog.open(ModuleListDialogComponent, {
			width: '1000px',
			height: '800px'
		});



	}
}

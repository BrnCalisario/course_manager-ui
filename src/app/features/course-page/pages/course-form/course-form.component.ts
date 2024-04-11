import { Component } from "@angular/core";
import Module from "@domain/module/module.model";
import EditableHeader from "@features/course-page/components/editable-header/editable-header.component";
import { SharedModule } from "@shared/shared.module";

@Component({
	selector: 'app-course-form',
	standalone: true,
	imports: [SharedModule, EditableHeader],
	templateUrl: './course-form.component.html',
	styleUrl: './course-form.component.scss'
})
export default class CourseFormComponent {

	public modules: Module[] = [
		{
			Id: '1',
			Name: 'Module 1',
			Workload: 3,
			Dependencies: undefined
		},
		{
			Id: '1',
			Name: 'Module 2',
			Workload: 4,
			Dependencies: undefined
		},
		{
			Id: '1',
			Name: 'Module 3',
			Workload: 5,
			Dependencies: undefined
		},
		{
			Id: '1',
			Name: 'Module 3',
			Workload: 5,
			Dependencies: undefined
		},
		{
			Id: '1',
			Name: 'Module 3',
			Workload: 5,
			Dependencies: undefined
		},
	];

	public formatModule(module: Module): string {
		return `${module.Name} - Workload: ${module.Workload} h`;
	}

}

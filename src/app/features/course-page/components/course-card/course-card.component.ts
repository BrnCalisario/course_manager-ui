import { Component, Input } from '@angular/core';
import Course from '@domain/course/course.model';
import { SharedModule } from '@shared/shared.module';

@Component({
	selector: 'app-course-card',
	standalone: true,
	imports: [SharedModule],
	templateUrl: './course-card.component.html',
	styleUrl: './course-card.component.scss',
})
export class CourseCardComponent {
	@Input()
	course!: Course;

	get TotalWorkload() {
		return this.course.Modules.reduce(
			(acc, module) => acc + module.Workload,
			0
		);
	}
}

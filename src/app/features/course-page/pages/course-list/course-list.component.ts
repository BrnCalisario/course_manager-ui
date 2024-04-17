import { Component } from '@angular/core';
import Course from '@domain/course/course.model';
import { CourseCardComponent } from '@features/course-page/components/course-card/course-card.component';
import { SharedModule } from '@shared/shared.module';

@Component({
	selector: 'app-course-list',
	standalone: true,
	imports: [SharedModule, CourseCardComponent],
	templateUrl: './course-list.component.html',
	styleUrl: './course-list.component.scss'
})
export class CourseListComponent {

	constructor() { }

	courses: Course[] = [];
	// 	{ Id: '1', Name: "FullStack Developer", TotalWorkload: 300, Description: "Load of techs and stuff,Load of techs and stuff, Load of techs and stuff,Load of techs and stuffLoad of techs and stuffLoad of techs and stuffLoad of techs and stuff" },
	// 	{ Id: '1', Name: "FullStack Developer", TotalWorkload: 300, Description: "Load of techs and stuff" },
	// 	{ Id: '1', Name: "FullStack Developer", TotalWorkload: 300, Description: "Load of techs and stuff" },
	// 	{ Id: '1', Name: "FullStack Developer", TotalWorkload: 300, Description: "Load of techs and stuff" }
	// ]

}

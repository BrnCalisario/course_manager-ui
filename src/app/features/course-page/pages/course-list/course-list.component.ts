import { Component, OnInit } from '@angular/core';
import Course from '@domain/course/course.model';
import { CourseCardComponent } from '@features/course-page/components/course-card/course-card.component';
import CourseService from '@shared/services/course.service';
import { SharedModule } from '@shared/shared.module';
import { Subject, takeUntil } from 'rxjs';
import ODataQueryCommand from 'src/lib/odata/ODataCommand';

@Component({
	selector: 'app-course-list',
	standalone: true,
	imports: [SharedModule, CourseCardComponent],
	templateUrl: './course-list.component.html',
	styleUrl: './course-list.component.scss'
})
export class CourseListComponent implements OnInit {

	queryCommand: ODataQueryCommand<Course>;

	destroy$: Subject<void> = new Subject();
	courses: Course[] = [];

	constructor(entityService: CourseService) {
		this.queryCommand = entityService.listCommand();
	}

	public ngOnInit(): void {
		this.queryCommand.response$.pipe(takeUntil(this.destroy$))
			.subscribe(res => {
				this.courses = res.value;
			})

		this.queryCommand.execute();
	}


}

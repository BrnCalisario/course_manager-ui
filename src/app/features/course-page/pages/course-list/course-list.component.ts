import { debounceTime, Subject, takeUntil } from 'rxjs';
import ODataQueryCommand from 'src/lib/odata/ODataCommand';

import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import Course from '@domain/course/course.model';
import { CourseCardComponent } from '@features/course-page/components/course-card/course-card.component';
import CourseService from '@shared/services/course.service';
import { SharedModule } from '@shared/shared.module';

@Component({
	selector: 'app-course-list',
	standalone: true,
	imports: [SharedModule, CourseCardComponent],
	templateUrl: './course-list.component.html',
	styleUrl: './course-list.component.scss',
})
export class CourseListComponent implements OnInit {
	public searchControl: FormControl<string | null> = new FormControl('');

	public queryCommand: ODataQueryCommand<Course>;

	private destroy$: Subject<void> = new Subject();
	public courses: Course[] = [];

	constructor(entityService: CourseService) {
		this.queryCommand = entityService.listCommand();

		this.queryCommand.params = {
			$expand: 'Modules',
		};
	}

	public ngOnInit(): void {
		this.queryCommand.response$
			.pipe(takeUntil(this.destroy$))
			.subscribe((res) => {
				this.courses = res.value;
			});

		this.searchControl.valueChanges
			.pipe(takeUntil(this.destroy$), debounceTime(500))
			.subscribe((text: string | null) => {
				this.queryCommand.params = {
					$filter: { contains: { Name: text! } },
				};

				this.queryCommand.execute();
			});

		this.queryCommand.execute();
	}

	public updateList(): void {
		this.queryCommand.execute();
	}
}

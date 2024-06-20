import { take } from 'rxjs';
import ODataQueryCommand from 'src/lib/odata/ODataCommand';
import { ODataSingleResponse } from 'src/lib/odata/types/ODataResponse';

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import Course from '@domain/course/course.model';
import { ClassFormComponent } from '@features/class-page/pages/class-form/class-form.component';
import { ConfirmDeleteDialog } from '@shared/components/delete-dialog/confirm-delete.component';
import CourseService from '@shared/services/course.service';
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
	public course!: Course;

	@Output()
	public onDeleteCourse: EventEmitter<void> = new EventEmitter<void>();

	private deleteCommand: ODataQueryCommand<
		Course,
		ODataSingleResponse<Course>
	>;

	private targetId?: Course['Id'];

	constructor(
		private readonly dialog: MatDialog,
		private readonly router: Router,
		courseService: CourseService
	) {
		this.deleteCommand = courseService.deleteCommand(() => this.targetId!);
	}

	get TotalWorkload(): number {
		return this.course.Modules.reduce(
			(acc, module) => acc + module.Workload,
			0
		);
	}

	public onDelete(): void {
		const dialogRef = this.dialog.open(ConfirmDeleteDialog);

		dialogRef.componentInstance.entityId = this.course.Id;

		const confirmSub$ = dialogRef.componentInstance.onConfirm
			.pipe(take(1))
			.subscribe((id) => {
				this.targetId = id;
				this.deleteCommand.execute();
			});

		dialogRef.afterClosed().subscribe(() => confirmSub$.unsubscribe());

		this.deleteCommand.response$.pipe(take(1)).subscribe((res) => {
			dialogRef.close();
			this.onDeleteCourse.emit();
		});
	}

	public onUpdate(): void {
		this.router.navigate(['/course', 'form', this.course.Id]);
	}

	public createClass(): void {
		const dialogRef = this.dialog.open(ClassFormComponent);
		dialogRef.componentInstance.course = this.course;
	}
}

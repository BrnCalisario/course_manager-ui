import { filter, map, take } from 'rxjs';
import ODataQueryCommand from 'src/lib/odata/ODataCommand';
import {
	ODataSingleResponse,
	removeODataProperties,
} from 'src/lib/odata/types/ODataResponse';

import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Competence } from '@domain/competence/competence.models';
import Course from '@domain/course/course.model';
import Module from '@domain/module/module.model';
import { ModuleListDialogComponent } from '@features/course-page/components/module-list-dialog/module-list-dialog.component';
import CourseService from '@shared/services/course.service';
import { SharedModule } from '@shared/shared.module';

@Component({
	selector: 'app-course-form',
	standalone: true,
	imports: [SharedModule],
	templateUrl: './course-form.component.html',
	styleUrl: './course-form.component.scss',
})
export default class CourseFormComponent implements OnInit {
	@Input({ required: true })
	public courseEntity?: Course;

	public mainCompetences: Competence[] = [];

	public competencesOverflow: number = 0;

	public isLoading: boolean = false;

	public readonly courseForm: FormGroup;

	private readonly _maxCompetences = 15;

	public isEdit: boolean = false;

	private courseId?: number;

	//#region

	private findCommand: ODataQueryCommand<Course, ODataSingleResponse<Course>>;

	private saveCommand: ODataQueryCommand<Course, ODataSingleResponse<Course>>;

	//#endregion

	public get courseColor() {
		return this.courseForm.get('Color')?.value as string;
	}

	public set courseColor(color: string) {
		this.courseForm.get('Color')?.setValue(color);
	}

	private get courseName() {
		return this.courseForm.get('Name')?.value as string;
	}

	public get courseNameForm() {
		return this.courseForm.get('Name') as FormControl<string>;
	}

	public get courseDescription() {
		return this.courseForm.get('Description')?.value as string;
	}

	public get courseModules() {
		return this.courseForm.get('Modules')?.value as Module[];
	}

	public set courseModules(modules: Module[]) {
		this.courseForm.get('Modules')?.setValue(modules);
	}

	private get courseModulesForm() {
		return this.courseForm.get('Modules') as FormControl<Module[]>;
	}

	constructor(
		private readonly dialog: MatDialog,
		private readonly courseService: CourseService,
		private readonly router: Router,
		private readonly route: ActivatedRoute
	) {
		this.courseForm = new FormGroup({
			Name: new FormControl<string>('', [
				Validators.required,
				Validators.maxLength(255),
			]),

			Description: new FormControl<string>('', [
				Validators.required,
				Validators.minLength(10),
				Validators.maxLength(5000),
			]),

			Modules: new FormControl<Module[]>([]),

			Color: new FormControl<string>(''),
		});

		this.courseModulesForm.valueChanges.subscribe((modules) => {
			const competencesCount = this.countCompetences(modules);

			this.mainCompetences = competencesCount
				.slice(0, this._maxCompetences)
				.map((c) => c.Competence);

			this.competencesOverflow =
				competencesCount.length - this._maxCompetences;
		});

		this.findCommand = this.courseService.findCommand(() => this.courseId!);

		this.findCommand.params = {
			$expand: 'Modules($expand=Competences)',
		};

		this.saveCommand = this.courseService.saveCommand(
			() => this.buildCourse(),
			this.isEdit
		);

		this.saveCommand.response$.subscribe({
			next: () => {
				console.log('Course created');
			},
			error: () => {
				console.error('Error creating course');
			},
		});
	}

	public ngOnInit(): void {
		this.courseId = Number(this.route.snapshot.params['id']);

		if (!this.courseId) return;

		this.isEdit = true;

		this.findCommand.response$
			.pipe(
				map((res) => removeODataProperties(res)),
				take(1)
			)
			.subscribe({
				next: (res: any) => {
					delete res.Deleted;

					this.courseForm.setValue(res);
				},
				error: (_) => {
					this.router.navigate(['/module', 'form']);
				},
				complete: () => {
					this.isLoading = false;
				},
			});

		this.isLoading = true;
		this.findCommand.execute();
	}

	public onSubmit() {
		this.saveCommand.execute();
	}

	public formatModule(module: Module): string {
		return `${module.Name} - Workload: ${module.Workload} h`;
	}

	public openModuleListDialog() {
		const dialogRef = this.dialog.open(ModuleListDialogComponent, {
			width: '1000px',
			height: '800px',
		});

		dialogRef.componentInstance.selected = [...this.courseModules];

		dialogRef
			.afterClosed()
			.pipe(
				filter((res: boolean) => res),
				map((_) => dialogRef.componentInstance.selected)
			)
			.subscribe((selected) => {
				this.courseModules = selected;
			});
	}

	private buildCourse(): Course {
		const course = new Course(
			this.courseId ?? 0,
			this.courseName,
			this.courseDescription,
			this.courseModules,
			this.courseColor
		);

		return course;
	}

	private countCompetences(modules: Module[]) {
		const competenceCounts: {
			[name: string]: { Competence: Competence; Count: number };
		} = {};

		modules.forEach((module) => {
			module.Competences.forEach((competence) => {
				const competenceName = competence.Name;

				if (competenceCounts[competenceName]) {
					competenceCounts[competenceName].Count++;
				} else {
					competenceCounts[competenceName] = {
						Competence: competence,
						Count: 1,
					};
				}
			});
		});

		const result = Object.keys(competenceCounts)
			.map((competence) => ({
				Competence: competenceCounts[competence].Competence,
				Count: competenceCounts[competence].Count,
			}))
			.sort((l, r) => r.Count - l.Count);

		return result;
	}
}

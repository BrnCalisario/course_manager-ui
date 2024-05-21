import { filter, map } from 'rxjs';

import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
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

	public readonly courseForm: FormGroup;

	private readonly _maxCompetences = 15;

	public get isEdit() {
		return !!this.courseEntity && this.courseEntity.Id !== 0;
	}

	public get courseColor() {
		return this.courseForm.get('color')?.value as string;
	}

	public set courseColor(color: string) {
		console.log(color);
		this.courseForm.get('color')?.setValue(color);
	}

	private get courseName() {
		return this.courseForm.get('name')?.value as string;
	}

	public get courseNameForm() {
		return this.courseForm.get('name') as FormControl<string>;
	}

	public get courseDescription() {
		return this.courseForm.get('description')?.value as string;
	}

	private get courseModules() {
		return this.courseForm.get('modules')?.value as Module[];
	}

	private set courseModules(modules: Module[]) {
		this.courseForm.get('modules')?.setValue(modules);
	}

	private get courseModulesForm() {
		return this.courseForm.get('modules') as FormControl<Module[]>;
	}

	constructor(
		private readonly dialog: MatDialog,
		private readonly courseService: CourseService
	) {
		this.courseForm = new FormGroup({
			name: new FormControl<string>('', [
				Validators.required,
				Validators.maxLength(255),
			]),

			description: new FormControl<string>('', [
				Validators.required,
				Validators.minLength(10),
				Validators.maxLength(5000),
			]),

			modules: new FormControl<Module[]>([]),

			color: new FormControl<string>(''),
		});

		this.courseModulesForm.valueChanges.subscribe((modules) => {
			const competencesCount = this.countCompetences(modules);

			this.mainCompetences = competencesCount
				.slice(0, this._maxCompetences)
				.map((c) => c.Competence);

			this.competencesOverflow =
				competencesCount.length - this._maxCompetences;
		});
	}

	public ngOnInit(): void {
		if (this.courseEntity) {
			this.courseForm.patchValue({
				name: this.courseEntity?.Name,
				description: this.courseEntity?.Description,
				modules: this.courseEntity?.Modules,
			});
		}
	}

	public onSubmit() {
		console.log(
			new Course(
				this.courseName,
				this.courseDescription,
				this.courseModules,
				this.courseColor
			)
		);

		const createCommand = this.courseService.postCommand(
			() =>
				new Course(
					this.courseName,
					this.courseDescription,
					this.courseModules,
					this.courseColor
				)
		);

		createCommand.response$.subscribe({
			next: () => {
				console.log('Course created');
			},
			error: () => {
				console.error('Error creating course');
			},
		});

		createCommand.execute();
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

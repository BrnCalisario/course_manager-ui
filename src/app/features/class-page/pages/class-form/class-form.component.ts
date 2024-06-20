import { DialogRef } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import Course from '@domain/course/course.model';
import StorageService from '@shared/services/storage.service';
import { SharedModule } from '@shared/shared.module';

@Component({
	selector: 'app-class-form',
	standalone: true,
	imports: [SharedModule, MatDatepickerModule],
	templateUrl: './class-form.component.html',
	styleUrl: './class-form.component.scss'
})
export class ClassFormComponent {

	course: Course | undefined;

	public form: FormGroup = new FormGroup({
		Name: new FormControl<string>('', [Validators.required]),
		StartDate: new FormControl<Date>(new Date(), [Validators.required]),
		EndDate: new FormControl<Date>(new Date(), [Validators.required]),
	});

	constructor(private readonly storageService: StorageService, private readonly dialogRef: DialogRef<ClassFormComponent>) { }

	onCreate() {
		const body = this.form.value;

		body.modules = this.course?.Modules ?? null;
		this.storageService.appendList('classes', body);
		this.dialogRef.close();
	}

}

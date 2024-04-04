import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { Competence } from '@domain/competence/competence.models';
import { SharedModule } from '@shared/shared.module';

@Component({
	selector: 'app-competence-dialog',
	standalone: true,
	imports: [SharedModule, MatDialogModule, MatTableModule],
	templateUrl: './competence-dialog.component.html',
	styleUrl: './competence-dialog.component.scss'
})
export class CompetenceDialogComponent {

	public form: FormGroup = new FormGroup({
		Name: new FormControl<string>('', [Validators.required])
	});

	constructor(private readonly dialogRef: MatDialogRef<CompetenceDialogComponent>) { }

	public onSubmit() {
		const obj = { ...new Competence(), ...this.form.value }

		// this.competenceService.post(obj)
		// 	.subscribe({
		// 		next: _ => {
		// 			this.dialogRef.close();
		// 		},
		// 		error: err => {
		// 			alert("Error");
		// 		}
		// 	});
	}
}

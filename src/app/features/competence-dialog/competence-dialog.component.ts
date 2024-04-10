import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { Competence } from '@domain/competence/competence.models';
import CompetenceService from '@shared/services/competence.service';
import { SharedModule } from '@shared/shared.module';

@Component({
	selector: 'app-competence-dialog',
	standalone: true,
	imports: [SharedModule, MatDialogModule, MatTableModule],
	templateUrl: './competence-dialog.component.html',
	styleUrl: './competence-dialog.component.scss',
})
export class CompetenceDialogComponent {
	@Output()
	public onSave = new EventEmitter<Competence>();

	public form: FormGroup = new FormGroup({
		Name: new FormControl<string>('', [Validators.required]),
	});

	constructor(
		private readonly competenceService: CompetenceService,
		private readonly dialogRef: MatDialogRef<CompetenceDialogComponent>
	) { }

	public onSubmit() {
		this.competenceService.post(this.form.value).subscribe({
			next: (res) => {
				this.onSave.emit(res);
				this.dialogRef.close();
			},
			error: (err) => {
				console.error(err);
			},
		});
	}
}

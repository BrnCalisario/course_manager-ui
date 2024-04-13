import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
export class CompetenceDialogComponent implements OnInit {

	@Output()
	public onSave = new EventEmitter<Competence>();

	@Input({ required: true })
	public editMode: boolean = false;

	public form: FormGroup = new FormGroup({
		Name: new FormControl<string>('', [Validators.required]),
	});
	constructor(
		private readonly competenceService: CompetenceService,
		private readonly dialogRef: MatDialogRef<CompetenceDialogComponent>
	) { }

	ngOnInit(): void {
	}

	public onSubmit() {

		this.competenceService.save({ ...this.form.value }, this.editMode)
			.subscribe({
				next: (res) => {
					this.onSave.emit(res);
					this.dialogRef.close();
				},
				error: (error) => {
					console.error(error)
				}
			});
	}
}

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

	@Input()
	public entity?: Competence;

	public form: FormGroup = new FormGroup({
		Name: new FormControl<string>('', [Validators.required]),
	});

	constructor(
		private readonly competenceService: CompetenceService,
		private readonly dialogRef: MatDialogRef<CompetenceDialogComponent>
	) { }

	ngOnInit(): void {

		if (!this.entity && this.editMode) throw Error("Provide entity to edit!");

		if (this.entity && !this.editMode) console.warn("Don't need to provide entity on create mode");

		if (this.editMode) {
			this.form.get('Name')?.setValue(this.entity?.Name);
		}
	}

	public onSubmit() {

		if (this.form.value.Name == this.entity?.Name) return;

		const body = this.entity ? { Id: this.entity.Id, ...this.form.value } : { ...this.form.value };

		this.competenceService.save(body, this.editMode)
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

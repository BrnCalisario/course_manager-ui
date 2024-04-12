import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
	selector: 'app-delete-competence-dialog',
	standalone: true,
	imports: [MatDialogModule, MatButtonModule],
	templateUrl: './delete-competence-dialog.component.html',
	styleUrl: './delete-competence-dialog.component.scss',
})
export class DeleteCompetenceDialog {

	constructor(public dialogRef: MatDialogRef<DeleteCompetenceDialog>) { }

	@Output()
	public onConfirm: EventEmitter<string> = new EventEmitter<string>();

	entityId!: string;

	confirmDelete() {
		this.onConfirm.emit(this.entityId);
	}

	closeDialog() {
		this.dialogRef.close();
	}
}

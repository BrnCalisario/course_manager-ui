import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
	selector: 'app-confirm-delete-dialog',
	templateUrl: './confirm-delete.component.html',
	styleUrl: './confirm-delete.component.scss',
})
export class ConfirmDeleteDialog {

	constructor(public dialogRef: MatDialogRef<ConfirmDeleteDialog>) { }

	@Input()
	public confirmMessage: string = "Are you sure you want to delete this ?";

	@Output()
	public onConfirm: EventEmitter<string> = new EventEmitter<string>();

	@Input({ required: true })
	public entityId!: string;

	confirmDelete() {
		this.onConfirm.emit(this.entityId);
	}

	closeDialog() {
		this.dialogRef.close();
	}
}

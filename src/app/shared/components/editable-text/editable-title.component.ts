import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
	selector: 'editable-text',
	templateUrl: './editable-text.component.html',
	styleUrl: './editable-text.component.scss',
})
export default class EditableText {
	@Input({ required: true })
	public label!: string;

	@Input({ required: true })
	public textForm!: FormControl<string>;

	public edit: boolean = false;

	public toggleEdit(): void {
		this.edit = !this.edit;
	}
}

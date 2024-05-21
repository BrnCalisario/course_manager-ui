import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
	selector: 'app-color-picker',
	templateUrl: './color-picker.component.html',
	styleUrl: './color-picker.component.scss',
})
export class ColorPickerComponent {
	@Input({ required: true })
	public color: string = '#2fa296';

	@Output()
	public colorChange = new EventEmitter<string>();
}

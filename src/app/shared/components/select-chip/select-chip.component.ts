
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatChipSelectionChange } from '@angular/material/chips';

@Component({
	selector: 'app-select-chip',
	templateUrl: './select-chip.component.html',
	styleUrl: './select-chip.component.scss',
})
export class SelectChipComponent<T> {
	@Input({ required: true })
	public options: T[] = [];

	@Input({ required: true })
	public selectedValues: T[] = [];

	@Input({ required: true })
	public toLabel!: (item: T) => string;

	@Output('selectedValuesChange')
	public onChange = new EventEmitter<T[]>();

	public onSelectionChange($event: MatChipSelectionChange): void {
		if (!$event.isUserInput) return;

		const {
			source: { value },
			selected,
		} = $event;

		if (selected) {
			this.selectedValues.push(value);
		} else {
			this.selectedValues = this.selectedValues.filter(
				(item) => item !== value
			);
		}

		console.log(this.selectedValues);

		// // this.onChange.emit(this.selectedValues);
	}

	public isSelected = (item: T): boolean => {
		console.log(this.selectedValues)
		console.log(item)
		console.log(this.selectedValues.includes(item))

		return this.selectedValues.includes(item);
	}
}

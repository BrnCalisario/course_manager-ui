import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatChipSelectionChange } from '@angular/material/chips';
import BaseEntity from '@domain/base/base.entity';

@Component({
	selector: 'app-select-chip',
	templateUrl: './select-chip.component.html',
	styleUrl: './select-chip.component.scss',
})
export class SelectChipComponent<TKey, T extends BaseEntity<TKey>> {
	@Input({ required: true })
	public options: T[] = [];

	@Input({ required: true })
	public selectedValues: T[] = [];

	@Input({ required: true })
	public toLabel!: (item: T) => string;

	@Output('selectedValuesChange')
	public onChange = new EventEmitter<T[]>();

	@Input({ required: false })
	contextMenuFn: (event: MouseEvent, option: T) => void = (event: MouseEvent, option: T) => { };

	selectedId!: string;

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

		this.onChange.emit(this.selectedValues);
	}

	public isSelected = (item: T): boolean =>
		this.selectedValues.some(entry => entry.Id === item.Id);

	public getContextMenuStyle() {
		return {
			display: true ? 'block' : 'none',
			position: 'fixed',
			left: `30px`,
			top: `50px`
		}
	}
}

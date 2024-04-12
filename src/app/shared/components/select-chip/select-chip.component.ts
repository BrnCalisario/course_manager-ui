import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
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

	public isDisplayContextMenu: boolean = true;
	public rightClickMenuItems: Array<{ label: string, event: string }> = [];
	public rightClickMenuPosition: { x: number, y: number } = { x: 0, y: 0 };

	displayContextMenu(event: MouseEvent) {

		event.preventDefault();

		this.isDisplayContextMenu = true;

		this.rightClickMenuItems = [{ label: 'Edit', event: 'Edit competence' }, { label: 'Remove', event: 'Remove competence' }];

		this.rightClickMenuPosition = { x: event.clientX, y: event.clientY };
	}

	getContextMenuStyle() {
		return {
			position: 'fixed',
			left: `${this.rightClickMenuPosition.x}px`,
			top: `${this.rightClickMenuPosition.y}px`
		}
	}

	@HostListener('document:click')
	documentClick(): void {
		this.isDisplayContextMenu = false;
	}

	handleMenuItemClick(event: any) {
		console.log(event.event);
	}

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
}

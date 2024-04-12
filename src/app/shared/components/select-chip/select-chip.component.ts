import { Component, EventEmitter, HostListener, Input, Output, ViewChild } from '@angular/core';
import { MatChipSelectionChange } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import BaseEntity from '@domain/base/base.entity';
import { DeleteCompetenceDialog } from '@features/competence-dialog/delete-competence-dialog/delete-competence-dialog.component';
import CompetenceService from '@shared/services/competence.service';
import { take } from 'rxjs';
import { ContextMenuComponent, ContextMenuData, MenuItemEvent } from '../context-menu/context-menu.component';

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

	@ViewChild('contextmenu')
	public contextMenu!: ContextMenuComponent

	private deleteCommand;

	selectedId!: string;

	constructor(private dialog: MatDialog, competenceService: CompetenceService) {
		this.deleteCommand = competenceService.deleteCommand(() => this.selectedId);
	}

	public isDisplayContextMenu: boolean = true;
	public rightClickMenuItems: Array<ContextMenuData> = [];
	public rightClickMenuPosition: { x: number, y: number } = { x: 0, y: 0 };

	displayContextMenu(event: MouseEvent, option: T) {

		event.preventDefault();

		this.isDisplayContextMenu = true;

		this.contextMenu.selectedItem = option;

		this.rightClickMenuItems = [
			{ label: 'Edit', icon: 'edit' },
			{ label: 'Remove', icon: 'delete' }
		];

		this.rightClickMenuPosition = { x: event.clientX, y: event.clientY };
	}

	getContextMenuStyle() {
		return {
			display: this.isDisplayContextMenu ? 'block' : 'none',
			position: 'fixed',
			left: `${this.rightClickMenuPosition.x}px`,
			top: `${this.rightClickMenuPosition.y}px`
		}
	}

	@HostListener('document:click')
	documentClick(): void {
		this.isDisplayContextMenu = false;
	}

	handleMenuItemClick(event: MenuItemEvent) {
		console.log("event: ", event.type);
		console.log("competence id: ", event.item.Id);

		//TODO: On Edit, On Remove

		const dialogRef = this.dialog.open(DeleteCompetenceDialog);

		dialogRef.componentInstance.entityId = event.item.Id;

		dialogRef.componentInstance.onConfirm
			.subscribe(id => {
				this.selectedId = id;
				this.deleteCommand.execute();
			});

		this.deleteCommand.response$.pipe(
			take(1))
			.subscribe({
				next: () => dialogRef.close(), // TODO: Refresh List
				error: () => alert("Erro ao deletar") // TODO: Feedback Service
			})
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

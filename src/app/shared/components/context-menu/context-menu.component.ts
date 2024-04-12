import { Component, EventEmitter, Input, Output } from "@angular/core";

export type ContextMenuData = {
	label: string;
	icon?: string;
}

export type MenuItemEvent = {
	type: string,
	item: any
}

@Component({
	selector: "app-context-menu",
	templateUrl: "./context-menu.component.html",
	styleUrls: ["./context-menu.component.scss"],
})
export class ContextMenuComponent {
	@Input()
	contextMenuItems!: Array<ContextMenuData>;

	@Output()
	onContextMenuItemClick: EventEmitter<MenuItemEvent> = new EventEmitter<MenuItemEvent>();

	selectedItem?: any;

	onContextMenuClick(eventType: string): any {
		this.onContextMenuItemClick.emit({
			type: eventType,
			item: this.selectedItem
		});
	}
}
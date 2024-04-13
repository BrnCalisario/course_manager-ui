import { Component, EventEmitter, Input, Output } from "@angular/core";
import { ContextMenuData, MenuItemEvent } from "@shared/models/contex-tmenu.models";

@Component({
	selector: "app-context-menu",
	templateUrl: "./context-menu.component.html",
	styleUrls: ["./context-menu.component.scss"],
})
export class ContextMenuComponent<T> {

	@Input({ required: true })
	public contextMenuItems!: Array<ContextMenuData>;

	@Output()
	public onContextMenuItemClick: EventEmitter<MenuItemEvent<T>> = new EventEmitter<MenuItemEvent<T>>();

	public selectedItem?: T;

	public position: { x: number, y: number } = { x: 0, y: 0 }

	@Input()
	public display: boolean = false;

	public get style() {
		return {
			display: this.display ? 'block' : 'none',
			position: 'fixed',
			left: `${this.position.x}px`,
			top: `${this.position.y}px`,
		}
	}

	onContextMenuClick(eventType: string): any {
		if (!this.selectedItem) throw Error("Selected Item not provided");

		this.onContextMenuItemClick.emit({
			type: eventType,
			item: this.selectedItem
		});
	}
}

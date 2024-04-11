
import { Component, EventEmitter, Input, Output } from "@angular/core";

export type ContextMenuData = {
	label: string;
	event: string;
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
	onContextMenuItemClick: EventEmitter<any> = new EventEmitter<{ event: MouseEvent, data: string }>();

	onContextMenuClick(event: MouseEvent, data: string): any {
		this.onContextMenuItemClick.emit({
			event,
			data,
		});
	}
}
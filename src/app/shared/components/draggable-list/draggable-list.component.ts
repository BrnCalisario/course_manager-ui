import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input } from '@angular/core';

@Component({
	selector: 'draggable-list',
	templateUrl: './draggable-list.component.html',
	styleUrl: './draggable-list.component.scss',
})
export class DraggableList<T> {
	@Input({ required: true })
	public itemFormatter!: (item: T) => string;

	@Input({ required: true })
	public itemList!: Array<T>;

	drop(event: CdkDragDrop<T[]>) {
		moveItemInArray(this.itemList, event.previousIndex, event.currentIndex);
	}
}

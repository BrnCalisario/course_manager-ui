import { Component, Input } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
    selector: 'draggable-list',
    standalone: true,
    imports: [SharedModule, DragDropModule],
    templateUrl: './draggable-list.component.html',
    styleUrl: './draggable-list.component.scss'
})
export class DraggableList {

    @Input() 
    public itemFormatter : (item : any) => string = (item : any) => item as string;

    @Input() 
    public itemList !: Array<any>;

    public constructor() { }

    drop(event: CdkDragDrop<any[]>) {
        moveItemInArray(this.itemList, event.previousIndex, event.currentIndex);
    }
}

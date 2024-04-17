import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

@Component({
  selector: 'app-module-list-dialog',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './module-list-dialog.component.html',
  styleUrl: './module-list-dialog.component.scss'
})
export class ModuleListDialogComponent {

  selected: string[] = []

  options = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];

  drop(event: CdkDragDrop<string[]>) {

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      return;
    }

    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
  }
}

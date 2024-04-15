import { DragDropModule } from '@angular/cdk/drag-drop';
import { CdkMenuModule } from '@angular/cdk/menu';
import { AsyncPipe, CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormControlDirective, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltip } from '@angular/material/tooltip';
import { Router, RouterModule } from '@angular/router';
import { ContextMenuComponent } from './components/context-menu/context-menu.component';
import { ConfirmDeleteDialog } from './components/delete-dialog/confirm-delete.component';
import { DraggableList } from './components/draggable-list/draggable-list.component';
import { Header } from './components/header/header.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { SelectChipComponent } from './components/select-chip/select-chip.component';
@NgModule({
	declarations: [Header, SelectChipComponent, PaginatorComponent, DraggableList, ContextMenuComponent, ConfirmDeleteDialog],
	imports: [
		MatPaginatorModule,
		CommonModule,
		MatIcon,
		RouterModule,
		MatListModule,
		MatFormFieldModule,
		FormsModule,
		MatInputModule,
		MatTooltip,
		MatCardModule,
		ReactiveFormsModule,
		MatButtonModule,
		MatDividerModule,
		MatChipsModule,
		DragDropModule,
		CdkMenuModule,
		MatMenuModule,
		MatDialogModule
	],
	exports: [
		CommonModule,
		MatIcon,
		AsyncPipe,
		RouterModule,
		MatListModule,
		MatFormFieldModule,
		FormsModule,
		MatInputModule,
		MatTooltip,
		MatCardModule,
		ReactiveFormsModule,
		FormControlDirective,
		MatButtonModule,
		MatDividerModule,
		MatChipsModule,
		Header,
		ContextMenuComponent,
		SelectChipComponent,
		PaginatorComponent,
		DraggableList,
		DragDropModule,
		CdkMenuModule,
		MatMenuModule,
		MatDialogModule,
		ConfirmDeleteDialog
	],
	providers: [Router],
})
export class SharedModule { }

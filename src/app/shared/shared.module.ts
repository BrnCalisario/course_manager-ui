import { AsyncPipe, CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormControlDirective, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltip } from '@angular/material/tooltip';
import { Router, RouterModule } from '@angular/router';

import { Header } from './header/header.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { SelectChipComponent } from './select-chip/select-chip.component';

@NgModule({
	declarations: [Header, SelectChipComponent, PaginatorComponent],
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
	],
	exports: [
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
		SelectChipComponent,
		PaginatorComponent,
	],
	providers: [Router],
})
export class SharedModule { }

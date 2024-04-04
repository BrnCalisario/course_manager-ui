import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CompetenceDialogComponent } from '@features/competence-dialog/competence-dialog.component';
import { SharedModule } from '@shared/shared.module';

@Component({
	selector: 'app-module-list',
	standalone: true,
	imports: [SharedModule],
	templateUrl: './module-list.component.html',
	styleUrl: './module-list.component.scss'
})
export class ModuleListComponent {

}

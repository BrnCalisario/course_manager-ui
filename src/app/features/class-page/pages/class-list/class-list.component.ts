import { Component } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

@Component({
	selector: 'app-class-list',
	standalone: true,
	imports: [SharedModule],
	templateUrl: './class-list.component.html',
	styleUrl: './class-list.component.scss'
})
export class ClassListComponent {

	classes: any[] = [];
}

import { Component } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

@Component({
	selector: 'app-schedule-page',
	standalone: true,
	imports: [SharedModule],
	templateUrl: './schedule-page.component.html',
	styleUrl: './schedule-page.component.scss'
})
export class SchedulePageComponent {

}


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

	months: string[] = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

	dayLabels: string[] = ["D", "S", "T", "Q", "Q", "S", "S"];

	days: boolean[] = Array(42).fill(false);
}

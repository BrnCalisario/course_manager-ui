import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { DayInfo } from "@domain/lesson/lesson.model";
import { DateService } from "@shared/services/date.service";
import ScheduleService from "@shared/services/schedule.service";
import { SharedModule } from "@shared/shared.module";

@Component({
	selector: 'app-schedule-page',
	standalone: true,
	imports: [SharedModule],
	templateUrl: './schedule-page.component.html',
	styleUrl: './schedule-page.component.scss'
})
export class SchedulePageComponent {

	year: Array<Array<DayInfo>> = [];

	monthNames: string[] = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	weekNames: string[] = ["D", "S", "T", "Q", "Q", "S", "S"];

	constructor(
		private readonly router: Router,
		public readonly dateService: DateService,
		private readonly scheduleService: ScheduleService) {
		this.year = this.scheduleService.getFullYear(2024);
	}

	public onMonthClick(monthNumber: number): void {

		const today = new Date();
		const date = new Date(today.getFullYear(), monthNumber, 1);

		this.router.navigate(['schedule', 'month', date.toDateString()]);
	}
}


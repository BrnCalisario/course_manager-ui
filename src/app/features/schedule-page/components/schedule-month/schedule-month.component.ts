import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DayInfo } from '@domain/lesson/lesson.model';
import { DateInfo, DateService } from '@shared/services/date.service';
import ScheduleService from '@shared/services/schedule.service';
import { SharedModule } from '@shared/shared.module';

@Component({
	selector: 'app-schedule-month',
	standalone: true,
	imports: [SharedModule],
	templateUrl: './schedule-month.component.html',
	styleUrl: './schedule-month.component.scss'
})
export class ScheduleMonthComponent implements OnInit {

	public date!: Date;

	public monthDays: Array<DateInfo> = [];

	public month: DayInfo[] = [];

	public dayLabels = ["D", "S", "T", "Q", "Q", "S", "S"];

	constructor(
		private readonly router: Router,
		private readonly route: ActivatedRoute,
		private readonly scheduleService: ScheduleService,
		public readonly dateService: DateService,
	) {
	}

	public ngOnInit(): void {
		const month = this.route.snapshot.paramMap.get('month');

		if (!month) {
			this.router.navigate(['schedule']);
			return;
		}

		this.date = new Date(month);

		this.month = this.scheduleService.getMonthByDate(this.date, true);
	}

	public previous() {
		this.date.setMonth(this.date.getMonth() - 1);

		this.router.navigate(['schedule', "month", this.date.toDateString()]);

		this.month = this.scheduleService.getMonthByDate(this.date, true);
	}

	public next() {
		this.date.setMonth(this.date.getMonth() + 1);

		this.router.navigate(['schedule', "month", this.date.toDateString()]);

		this.month = this.scheduleService.getMonthByDate(this.date, true);
	}

	public gotoWeek(date: Date): void {
		this.router.navigate(["schedule", "week", date.toDateString()]);
	}

	public returnToSchedule() {
		this.router.navigate(["schedule", "year"])
	}

	public getDayClass(dayInfo: DayInfo, index: number): string {

		const classes = [];

		classes.push(dayInfo.month == this.date.getMonth() ? dayInfo.type : "disabled");

		if (index % 7 == 3) {
			classes.push('middle');
		}

		return classes.join(' ');
	}
}

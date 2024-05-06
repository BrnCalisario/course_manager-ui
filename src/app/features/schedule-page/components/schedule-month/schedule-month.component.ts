import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DateInfo, DateService } from '@shared/services/date.service';
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

	public dayLabels = ["D", "S", "T", "Q", "Q", "S", "S"];

	constructor(
		private readonly router: Router,
		private readonly route: ActivatedRoute,
		public readonly dateService: DateService) {
	}

	public ngOnInit(): void {
		const month = this.route.snapshot.paramMap.get('month');

		if (!month) {
			this.router.navigate(['schedule']);
			return;
		}

		this.date = new Date(month);

		this.monthDays = this.dateService.generateMonth(this.date);
	}

	public previous() {
		this.date.setMonth(this.date.getMonth() - 1);

		this.router.navigate(['schedule', "month", this.date.toDateString()]);

		this.monthDays = this.dateService.generateMonth(this.date);
	}

	public next() {
		this.date.setMonth(this.date.getMonth() + 1);

		this.router.navigate(['schedule', "month", this.date.toDateString()]);

		this.monthDays = this.dateService.generateMonth(this.date);
	}

	public gotoWeek(date: Date): void {
		this.router.navigate(["schedule", "week", date.toDateString()]);
	}

	public returnToSchedule() {
		this.router.navigate(["schedule", "year"])
	}

	public getDayClass(dateInfo: DateInfo, index: number): string {

		const classes = [];

		classes.push(dateInfo.visible ? dateInfo.type : "disabled");

		if (index % 7 == 3) {
			classes.push('middle');
		}

		return classes.join(' ');
	}
}

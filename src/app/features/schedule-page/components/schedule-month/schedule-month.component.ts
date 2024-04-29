import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { DateInfo } from '../schedule-page/schedule-page.component';

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
		private readonly route: ActivatedRoute) {
	}

	public ngOnInit(): void {
		const month = this.route.snapshot.paramMap.get('month');

		if (!month) {
			this.router.navigate(['schedule']);
			return;
		}

		this.date = new Date(month);
		this.generateMonth();
	}

	public previous() {
		this.date.setMonth(this.date.getMonth() - 1);

		this.router.navigate(['schedule', "month", this.date.toDateString()]);

		this.generateMonth();
	}

	public next() {
		this.date.setMonth(this.date.getMonth() + 1);

		this.router.navigate(['schedule', "month", this.date.toDateString()]);

		this.generateMonth();
	}

	public returnToSchedule() {
		this.router.navigate(["schedule", "year"])
	}

	public formatDate(date: Date) {

		const month = date.getMonth() + 1;

		const formatedMonth = month < 10 ? `0${month}` : month;

		return `${formatedMonth}/${date.getFullYear()}`
	}

	public changeState(day: DateInfo) {

		if (day.type != 'selected' && day.type != 'weekday') return;

		day.type = day.type === 'selected' ? 'weekday' : 'selected';
	}


	private generateMonth(): void {

		this.monthDays = [];

		const firstDay = new Date(this.date.getFullYear(), this.date.getMonth(), 1);

		const firstSunday = new Date(firstDay.getFullYear(), firstDay.getMonth(), 1 - firstDay.getDay());

		var temp = new Date(firstSunday);

		for (let day = 0; day < 42; day++) {

			const dayInfo: DateInfo = {
				date: new Date(temp),
				type: temp.getDay() === 0 || temp.getDay() === 6 ? 'weekend' : 'weekday',
				visible: temp.getMonth() === firstDay.getMonth()
			};

			this.monthDays.push(dayInfo);
			temp.setDate(temp.getDate() + 1);
		}
	}


}

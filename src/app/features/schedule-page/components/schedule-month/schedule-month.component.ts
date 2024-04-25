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

	date!: Date;

	monthDays: Array<DateInfo> = [];
	dayLabels = ["D", "S", "T", "Q", "Q", "S", "S"];

	constructor(
		private readonly router: Router,
		private readonly route: ActivatedRoute) {

	}

	ngOnInit(): void {
		const month = this.route.snapshot.paramMap.get('month');

		if (!month) {
			this.router.navigate(['schedule']);
			return;
		}

		this.date = new Date(month);
		this.generateMonth();
	}


	generateMonth(): void {

		const today = new Date();

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

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { DateInfo } from '../schedule-page/schedule-page.component';

@Component({
	selector: 'app-schedule-week',
	standalone: true,
	imports: [SharedModule],
	templateUrl: './schedule-week.component.html',
	styleUrl: './schedule-week.component.scss'
})
export class ScheduleWeekComponent implements OnInit {

	public date!: Date;
	public weekDays: DateInfo[] = [];

	public weekLabels: string[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

	constructor(
		private readonly router: Router,
		private readonly route: ActivatedRoute
	) { }

	public ngOnInit(): void {
		const date = this.route.snapshot.paramMap.get('date');

		if (!date) {
			this.router.navigate(['schedule']);
			return;
		}

		this.date = new Date(date);
		this.generateWeek();
	}

	public formatDate(date: Date): string | number {

		var day = date.getDate();

		if (day < 10) {
			return '0' + day;
		}

		return day;
	}

	private generateWeek(): void {

		this.weekDays = [];

		const firstDay = new Date(this.date);
		firstDay.setDate(firstDay.getDate() - firstDay.getDay() + 1);

		var temp = new Date(firstDay);

		for (let i = 0; i < 5; i++) {

			this.weekDays.push({
				date: new Date(temp),
				type: 'weekday',
				visible: true
			});

			temp.setDate(temp.getDate() + 1);
		}
	}

}

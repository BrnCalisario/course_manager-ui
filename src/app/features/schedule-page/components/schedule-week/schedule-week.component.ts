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

	constructor(
		private readonly router: Router,
		private readonly route: ActivatedRoute
	) {

	}

	public ngOnInit(): void {
		const date = this.route.snapshot.paramMap.get('date');

		if (!date) {
			this.router.navigate(['schedule']);
			return;
		}

		this.date = new Date(date);
		this.generateWeek();
	}

	private generateWeek(): void {

		this.weekDays = [];

		/// First day of week
		const firstDay = new Date(this.date);
		firstDay.setDate(firstDay.getDate() - firstDay.getDay());

		var temp = new Date(firstDay);

		for (let i = 0; i < 7; i++) {

			this.weekDays.push({
				date: new Date(temp),
				type: 'weekday',
				visible: true
			});

			temp.setDate(temp.getDate() + 1);
		}

	}

}

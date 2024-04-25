import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { SharedModule } from "@shared/shared.module";

export type DayType = 'weekday' | 'weekend' | 'holiday' | 'selected';

export type DateInfo = {
	date: Date;
	type: DayType;
	visible: boolean;
};

@Component({
	selector: 'app-schedule-page',
	standalone: true,
	imports: [SharedModule],
	templateUrl: './schedule-page.component.html',
	styleUrl: './schedule-page.component.scss'
})
export class SchedulePageComponent {

	year: Array<Array<DateInfo>> = [];

	monthNames: string[] = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	weekNames: string[] = ["D", "S", "T", "Q", "Q", "S", "S"];

	constructor(private readonly router: Router) {
		this.generateYear();
	}

	public onMonthClick(monthNumber: number): void {

		const today = new Date();
		const date = new Date(today.getFullYear(), monthNumber, 1);

		this.router.navigate(['schedule', 'month', date.toDateString()]);
	}

	private generateYear(): void {
		const today = new Date();
		var temp = null;

		for (let month = 0; month < 12; month++) {

			this.year.push([])

			const firstDay = new Date(today.getFullYear(), month, 1);

			const firstSunday = new Date(firstDay.getFullYear(), firstDay.getMonth(), 1 - firstDay.getDay());

			temp = new Date(firstSunday);

			for (let day = 0; day < 42; day++) {

				const dayInfo: DateInfo = {
					date: new Date(temp),
					type: temp.getDay() === 0 || temp.getDay() === 6 ? 'weekend' : 'weekday',
					visible: temp.getMonth() === firstDay.getMonth()
				};

				this.year[month].push(dayInfo);
				temp.setDate(temp.getDate() + 1);
			}
		}
	}
}


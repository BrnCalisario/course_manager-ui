import { Component } from '@angular/core';
import { SharedModule } from '@shared/shared.module';


export type DayType = 'weekday' | 'weekend' | 'holiday';

export type DayInfo = {
	day: number;
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

	year: Array<Array<DayInfo>> = [];

	monthNames: string[] = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	weekNames: string[] = ["D", "S", "T", "Q", "Q", "S", "S"];

	constructor() {
		this.generateYear();
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

				// this.year[month].push(temp.getMonth() === firstDay.getMonth());

				const dayInfo: DayInfo = {
					day: temp.getDate(),
					type: temp.getDay() === 0 || temp.getDay() === 6 ? 'weekend' : 'weekday',
					visible: temp.getMonth() === firstDay.getMonth()
				};

				this.year[month].push(dayInfo);
				temp.setDate(temp.getDate() + 1);
			}


		}
	}
}


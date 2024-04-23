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

	year: Array<Array<boolean>> = [];

	monthNames: string[] = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

	constructor() {
		this.foo();
	}

	foo() {
		const today = new Date();
		var temp = null;

		for (let month = 0; month < 12; month++) {

			this.year.push([])

			const firstDay = new Date(today.getFullYear(), month, 1);

			const firstSunday = new Date(firstDay.getFullYear(), firstDay.getMonth(), 1 - firstDay.getDay());

			temp = new Date(firstSunday);

			for (let day = 0; day < 42; day++) {
				this.year[month].push(temp.getMonth() === firstDay.getMonth());
				temp.setDate(temp.getDate() + 1);
			}

		}

		// const today = new Date();
		// const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
		// const firstSunday = new Date(firstDay.getFullYear(), firstDay.getMonth(), 1 - firstDay.getDay());

		// const temp = new Date(firstSunday);

		// for (let i = 0; i < 42; i++) {

		// 	this.days.push(temp.getMonth() === firstDay.getMonth());
		// 	temp.setDate(temp.getDate() + 1);

		// }




	}
}

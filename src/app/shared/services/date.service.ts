import { Injectable } from "@angular/core";

export type DayType = 'weekday' | 'weekend' | 'holiday' | 'selected';

export type DateInfo = {
	date: Date;
	type: DayType;
	visible: boolean;
	module?: { name: string, color: string } | null;
};

@Injectable({
	providedIn: 'root'
})
export class DateService {

	public generateWeek(input: Date): DateInfo[] {

		const weekDays: DateInfo[] = [];

		const firstDay = new Date(input);
		firstDay.setDate(firstDay.getDate() - firstDay.getDay() + 1);

		var temp = new Date(firstDay);

		for (let i = 0; i < 5; i++) {

			weekDays.push({
				date: new Date(temp),
				type: 'weekday',
				visible: true
			});

			temp.setDate(temp.getDate() + 1);
		}

		return weekDays;
	}

	public generateMonth(input: Date): DateInfo[] {

		const monthDays: DateInfo[] = [];

		const firstDay = new Date(input.getFullYear(), input.getMonth(), 1);

		const firstSunday = new Date(firstDay.getFullYear(), firstDay.getMonth(), 1 - firstDay.getDay());

		var temp = new Date(firstSunday);

		for (let day = 0; day < 42; day++) {

			const dayInfo: DateInfo = {
				date: new Date(temp),
				type: temp.getDay() === 0 || temp.getDay() === 6 ? 'weekend' : 'weekday',
				visible: temp.getMonth() === firstDay.getMonth()
			};

			monthDays.push(dayInfo);
			temp.setDate(temp.getDate() + 1);
		}

		return monthDays;
	}

	public generateYear(input: Date | void): DateInfo[][] {

		input ??= new Date();

		const year: DateInfo[][] = [];

		var temp = null;

		for (let month = 0; month < 12; month++) {

			year.push([])

			const firstDay = new Date(input.getFullYear(), month, 1);

			const firstSunday = new Date(firstDay.getFullYear(), firstDay.getMonth(), 1 - firstDay.getDay());

			temp = new Date(firstSunday);

			for (let day = 0; day < 42; day++) {

				const dayInfo: DateInfo = {
					date: new Date(temp),
					type: temp.getDay() === 0 || temp.getDay() === 6 ? 'weekend' : 'weekday',
					visible: temp.getMonth() === firstDay.getMonth()
				};

				year[month].push(dayInfo);
				temp.setDate(temp.getDate() + 1);
			}
		}

		return year;
	}

	public formatDateYear(date: Date) {

		const month = date.getMonth() + 1;

		const formatedMonth = month < 10 ? `0${month}` : month;

		return `${formatedMonth}/${date.getFullYear()}`
	}

	public formatDay(date: Date) {

		const day = date.getDate();

		return day < 10 ? `0${day}` : day;
	}
}

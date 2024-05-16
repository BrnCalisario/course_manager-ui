import { Injectable } from "@angular/core";
import { DayInfo, Lesson } from "@domain/lesson/lesson.model";
import Module from "@domain/module/module.model";

export type DayType = 'weekday' | 'weekend' | 'holiday' | 'selected';

export type DateInfo = {
	date: Date;
	type: DayType;
	visible: boolean;
	moduleA?: { name: string, color: string } | null;
	moduleB?: { name: string, color: string } | null;
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

	public mockYearLessons(year: number): DayInfo[] {

		const init = new Date(year, 0, 1);

		const result: DayInfo[] = [];

		const total = DateService.isLeapYear(init.getFullYear()) ? 366 : 365;

		var morningModule = new Module();
		morningModule.Name = "Module 1";

		var afternoonModule = new Module();
		afternoonModule.Name = "Module 2";
		morningModule.Color = "#FFaa33";

		var morningLesson = new Lesson();
		morningLesson.Module = morningModule;

		var afternoonLesson = new Lesson();
		afternoonLesson.Module = afternoonModule;

		for (var i = 0; i < total; ++i) {

			let dayInfo = new DayInfo(init);

			dayInfo.morning = morningLesson;
			dayInfo.afternoon = afternoonLesson;

			init.setDate(init.getDate() + 1);
		}

		return result;
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

	public formatWeekString(date: Date) {

		date ??= new Date();

		date.setDate(date.getDate() - date.getDay() + 1);

		const monday = this.formatDay(date);

		date.setDate(date.getDate() + 4);

		const friday = this.formatDay(date);

		const monthString = date.toString().split(' ')[1];

		return `${monthString}, ${monday} - ${friday}, ${date.getFullYear()}`;
	}

	public static getDaysInActualMonth(date: Date) {

		const month = date.getMonth();
		const year = date.getFullYear();

		return this.getDaysInMonth(year, month);
	}


	public static getDaysInMonth(year: number, month: number) {

		if (month < 0 || month > 11) throw Error("Invalid month");

		return [31, (this.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
	}

	public static isLeapYear(year: number) {
		return ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0)
	}
}

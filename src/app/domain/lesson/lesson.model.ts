import BaseEntity from "@domain/base/base.entity";
import Module from "@domain/module/module.model";
import { DateService } from "@shared/services/date.service";

export class Lesson implements BaseEntity<number> {
	Id: number = 0;
	Date: Date = new Date();
	Shift: "Morning" | "Afternoon" = "Morning";
	Class: undefined;
	Module: Module | null = null;
	Deleted: boolean = false;
}

export type DayType = 'weekday' | 'weekend' | 'holiday' | 'selected';

export class DayInfo {
	day: number = 1;
	month: number = 0;
	year: number = 1900;

	type: DayType = 'weekday';

	morning: Lesson = new Lesson();
	afternoon: Lesson = new Lesson();

	constructor(date?: Date | DayInfo | void) {

		if (!date) return;

		if (date instanceof Date) {
			this.setDate(date);
		}

		if ('day' in date && 'month' in date && 'year' in date && 'morning' in date && 'afternoon' in date) {

			this.setDate(new Date(date.year, date.month, date.day));

			this.morning = date.morning ?? new Lesson();
			this.afternoon = date.afternoon ?? new Lesson();
		}
	}

	public hasLesson(): boolean {
		return this.morning !== null || this.afternoon !== null;
	}

	public setDate(date: Date) {
		this.day = date.getDate();
		this.month = date.getMonth();
		this.year = date.getFullYear();

		this.type = DateService.isWeekend(date) ? "weekend" : "weekday";
	}

	public equals(date: Date): boolean {
		return this.day === date.getDate() &&
			this.month === date.getMonth() &&
			this.year === date.getFullYear();
	}

	public getDate(): Date {
		return new Date(this.year, this.month, this.day);
	}
}

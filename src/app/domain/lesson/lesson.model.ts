import BaseEntity from "@domain/base/base.entity";
import Module from "@domain/module/module.model";
import { DateService } from "@shared/services/date.service";

export class Lesson implements BaseEntity<number> {
    Id: number = 0;
    Date: Date = new Date();
    Shift: "Morning" | "Afternoon" = "Morning";
    Class: undefined;
    Module: Module | undefined;
    Deleted: boolean = false;
}

export type DayType = 'weekday' | 'weekend' | 'holiday' | 'selected';

export class DayInfo {
    day: number = 1;
    month: number = 0;
    year: number = 1900;

    type: DayType = 'weekday';

    morning: Lesson | undefined = undefined;
    afternoon: Lesson | undefined = undefined;

    constructor(date?: Date | void) {
        if (date) this.setDate(date);
    }

    public hasLesson(): boolean {
        return this.morning !== undefined || this.afternoon !== undefined;
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
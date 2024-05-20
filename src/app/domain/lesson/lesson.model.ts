import BaseEntity from "@domain/base/base.entity";
import Module from "@domain/module/module.model";

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

    morning: Lesson | undefined;
    afternoon: Lesson | undefined;

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

        this.type = date.getDay() === 0 || date.getDay() === 6 ? 'weekday' : 'weekend';
    }

    public equals(date: Date): boolean {
        return this.day === date.getDate() &&
            this.month === date.getMonth() &&
            this.year === date.getFullYear();
    }
}
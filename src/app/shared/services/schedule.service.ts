import { Injectable } from "@angular/core";
import { DayInfo } from "@domain/lesson/lesson.model";
import Module from "@domain/module/module.model";
import { DateService } from "./date.service";

@Injectable({ providedIn: 'root' })
export default class ScheduleService {

    public get scheduleDays(): DayInfo[] {
        return this._scheduleDays;
    }

    public set scheduleDays(dates: DayInfo[]) {
        this._scheduleDays = dates;
    }

    private _scheduleDays: DayInfo[] = [];

    constructor(dateService: DateService) {
        this.scheduleDays = dateService.mockYearLessons(new Date().getFullYear());

        console.log("Schedule service iniciado");
    }


    public updateLesson(dayInfo: DayInfo, module: Module | undefined, isMorning: boolean) {
        let targetIndex = this.scheduleDays.indexOf(dayInfo);

        if (targetIndex === -1) return;

        if (isMorning) {
            this.scheduleDays[targetIndex].morning!.Module = module;
        } else {
            this.scheduleDays[targetIndex].afternoon!.Module = module;
        }
    }

    public updateModuleColor(dayInfo: DayInfo, color: string, isMorning: boolean) {

        let targetIndex = this.scheduleDays.indexOf(dayInfo);

        if (targetIndex === -1) return;

        if (isMorning) {
            this.scheduleDays[targetIndex].morning!.Module!.Color = color;
        } else {
            this.scheduleDays[targetIndex].afternoon!.Module!.Color = color;
        }

    }

    public getWeek(date: Date): DayInfo[] {
        const result: DayInfo[] = [];

        const tempDate = new Date(date)
        tempDate.setDate(date.getDate() - date.getDay() + 1);

        for (let i = 0; i < 5; i++) {

            let target = this._scheduleDays.find(d => d.equals(tempDate));

            result.push(target ? target : new DayInfo(tempDate));

            tempDate.setDate(tempDate.getDate() + 1);
        }

        return result;
    }

    public getMonth(year: number, month: number): DayInfo[] {
        const result: DayInfo[] = []

        const tempDate = new Date(year, month);

        const dayCount = DateService.getDaysInActualMonth(tempDate);

        for (let i = 0; i < dayCount; i++) {

            let target = this._scheduleDays.find(d => d.equals(tempDate));
            result.push(target ? target : new DayInfo(tempDate));

            tempDate.setDate(tempDate.getDate() + 1);
        }

        return result;
    }

    public getMonthFilled(year: number, month: number): DayInfo[] {

        const result: DayInfo[] = [];

        const tempDate = new Date(year, month);

        /// Set to first sunday of Month Filled.
        tempDate.setDate(tempDate.getDate() - tempDate.getDay());

        for (let i = 0; i < 42; i++) {

            let target = this._scheduleDays.find(d => d.equals(tempDate));

            result.push(target ? target : new DayInfo(tempDate))

            tempDate.setDate(tempDate.getDate() + 1);
        }

        return result;
    }

    public getMonthByDate(date: Date, filled = false): DayInfo[] {
        const month = date.getMonth();
        const year = date.getFullYear();

        if (filled) {
            return this.getMonthFilled(year, month);
        }

        return this.getMonth(year, month);
    }

    public getFullYear(year: number): DayInfo[][] {
        const result: DayInfo[][] = [];

        for (let month = 0; month < 12; month++) {
            const monthList = this.getMonthFilled(year, month);
            result.push(monthList);
        }

        return result;
    }
}
import { Injectable } from "@angular/core";
import { DayInfo } from "@domain/lesson/lesson.model";
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

    constructor(private readonly dateService: DateService) {
        this.scheduleDays = dateService.mockYearLessons(new Date().getFullYear());
    }

    /** 
     * @param month - number between 0 and 11
     * @param year  - year number
     */
    public getMonth(month: number, year: number): DayInfo[] {
        const result: DayInfo[] = []

        const tempDate = new Date(year, month);

        const dayCount = DateService.getDaysInActualMonth(tempDate);

        for (let i = 0; i < dayCount; i++) {

            let target = this._scheduleDays.find(d => d.equals(tempDate));
            result.push(target ? target : new DayInfo(tempDate));

            tempDate.setDate(tempDate.getDate() + 1);
        }

        console.log(result);

        return result;
    }
}
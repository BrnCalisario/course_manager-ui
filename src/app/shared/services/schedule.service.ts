import { Injectable } from "@angular/core";
import { DayInfo } from "@domain/lesson/lesson.model";
import Module from "@domain/module/module.model";
import { DateService } from "./date.service";
import StorageService from "./storage.service";

@Injectable({ providedIn: 'root' })
export default class ScheduleService {

	public get scheduleDays(): DayInfo[] {
		const days = this.storageService.getList<DayInfo>('scheduleDays');
		var parsed = days.map(d => new DayInfo(d));
		return parsed;
	}

	public set scheduleDays(dates: DayInfo[]) {
		this.storageService.setList("scheduleDays", dates);
	}

	constructor(dateService: DateService, private storageService: StorageService) {
		const days = this.storageService.getList<DayInfo>('scheduleDays');

		if (days.length < 1) {
			this.scheduleDays = dateService.mockYearLessons(2024);
		}

		console.log("Schedule service iniciado", days.length > 0 ? "com dados" : "sem dados");
	}


	public updateLesson(dayInfo: DayInfo, module: Module | null, isMorning: boolean) {

		let targetIndex = this.scheduleDays.findIndex(d => d.equals(dayInfo.getDate()));

		if (targetIndex === -1) return;

		const temp = this.scheduleDays;

		if (isMorning) {
			temp[targetIndex].morning!.Module = module;
		} else {
			temp[targetIndex].afternoon!.Module = module;
		}
		this.scheduleDays = temp;
	}


	public updateModuleColor(moduleName: string, color: string) {
		const temp = this.scheduleDays;

		temp.forEach(d => {
			if (d.morning?.Module?.Name === moduleName) {
				d.morning.Module!.Color = color;
			}
			if (d.afternoon?.Module?.Name === moduleName) {
				d.afternoon.Module!.Color = color;
			}
		});

		this.scheduleDays = temp;
	}

	public getWeek(date: Date): DayInfo[] {
		const result: DayInfo[] = [];

		const tempDate = new Date(date)
		tempDate.setDate(date.getDate() - date.getDay() + 1);

		for (let i = 0; i < 5; i++) {

			let target = this.scheduleDays.find(d => d.equals(tempDate));

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

			let target = this.scheduleDays.find(d => d.equals(tempDate));
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

			let target = this.scheduleDays.find(d => d.equals(tempDate));

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

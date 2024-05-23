import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonToggleChange, MatButtonToggleModule } from '@angular/material/button-toggle';
import { ActivatedRoute, Router } from '@angular/router';
import { DayInfo } from '@domain/lesson/lesson.model';
import Module from '@domain/module/module.model';
import { ColorPickerComponent } from '@shared/components/color-picker/color-picker.component';
import { DateService } from '@shared/services/date.service';
import ScheduleService from '@shared/services/schedule.service';
import { SharedModule } from '@shared/shared.module';

@Component({
	selector: 'app-schedule-week',
	standalone: true,
	imports: [SharedModule, MatButtonToggleModule, ColorPickerComponent],
	templateUrl: './schedule-week.component.html',
	styleUrl: './schedule-week.component.scss',
})
export class ScheduleWeekComponent implements OnInit {
	public date!: Date;
	public weekDays: DayInfo[] = [];
	public weekLabels: string[] = [
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
	];

	public mod1: Module = {
		Id: 0,
		Name: 'Module 1',
		Description: '',
		Objective: '',
		Workload: 0,
		Competences: [],
		Dependencies: [],
		Dependents: [],
		Color: '#25b4da',
		Deleted: false
	}

	public mod2: Module = {
		Id: 0,
		Name: 'Module 2',
		Description: '',
		Objective: '',
		Workload: 0,
		Competences: [],
		Dependencies: [],
		Dependents: [],
		Color: '#f5a623',
		Deleted: false
	}

	public modules: Module[] = [
		this.mod1, this.mod2
	];

	public cursorType: 'add' | 'clear' | null = null;

	public selectedModule: Module | null = null;

	constructor(
		private readonly router: Router,
		private readonly route: ActivatedRoute,
		public readonly location: Location,
		private readonly scheduleService: ScheduleService,
		public readonly dateService: DateService
	) { }

	public ngOnInit(): void {
		const date = this.route.snapshot.paramMap.get('date');

		if (!date) {
			this.router.navigate(['schedule']);
			return;
		}

		this.date = new Date(date);
		this.weekDays = this.scheduleService.getWeek(this.date);

		console.log(this.weekDays);
	}

	public onChange(event: MatButtonToggleChange) {
		this.cursorType = event.value;
	}

	public editPeriod(date: DayInfo, isMorning: boolean) {

		console.log("before", date);

		if (this.cursorType == 'clear') {
			this.scheduleService.updateLesson(date, undefined, isMorning);
		}

		if (this.cursorType == 'add') {
			this.scheduleService.updateLesson(date, this.selectedModule ?? undefined, isMorning);
		}

		console.log("after", date);
	}

	public formatTextColor(backgroundColor: string) {
		const color = this.hexToRgb(backgroundColor);

		if (!color) return '#FFF';

		const brightness = this.getBrightness(color);

		return brightness > 0.75 ? '#000' : '#FFF';
	}

	private hexToRgb(hex: string) {
		var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		return result
			? {
				r: parseInt(result[1], 16),
				g: parseInt(result[2], 16),
				b: parseInt(result[3], 16),
			}
			: null;
	}

	private getBrightness(rgb: { r: number; g: number; b: number }): number {
		const { r, g, b } = rgb;

		return (r * 299 + g * 587 + b * 114) / 1000 / 255;
	}
}

import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
	MatButtonToggleChange,
	MatButtonToggleModule,
} from '@angular/material/button-toggle';
import { ActivatedRoute, Router } from '@angular/router';
import { DayInfo } from '@domain/lesson/lesson.model';
import Module from '@domain/module/module.model';
import { ColorPickerComponent } from '@shared/components/color-picker/color-picker.component';
import { DateService } from '@shared/services/date.service';
import ScheduleService from '@shared/services/schedule.service';
import StorageService from '@shared/services/storage.service';
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

	public modules: Module[] = [];

	public cursorType: 'add' | 'clear' | null = null;

	public selectedModule: Module | null = null;

	constructor(
		private readonly router: Router,
		private readonly route: ActivatedRoute,
		public readonly location: Location,
		private readonly scheduleService: ScheduleService,
		public readonly dateService: DateService,
		private readonly storageService: StorageService
	) {}

	public ngOnInit(): void {
		const date = this.route.snapshot.paramMap.get('date');

		if (!date) {
			this.router.navigate(['schedule']);
			return;
		}

		this.date = new Date(date);
		this.weekDays = this.scheduleService.getWeek(this.date);

		let registedModules = this.storageService.getList<Module>('modules');

		if (registedModules) {
			this.modules = registedModules;
		}

		this.scheduleService.scheduleChanged.subscribe(() => {
			this.weekDays = this.scheduleService.getWeek(this.date);
		});

		this.scheduleService.moduleChanged.subscribe((modules) => {
			this.modules = modules;

			this.selectedModule =
				this.modules.find((m) => m.Name == this.selectedModule?.Name) ??
				null;
		});
	}

	public previous() {
		this.date.setDate(this.date.getDate() - 7);

		this.weekDays = this.scheduleService.getWeek(this.date);
	}

	public next() {
		this.date.setDate(this.date.getDate() + 7);

		this.weekDays = this.scheduleService.getWeek(this.date);
	}

	public onChange(event: MatButtonToggleChange) {
		this.cursorType = event.value;
	}

	public editWeekPeriod(isMorning: boolean) {
		this.weekDays.forEach((d) => {
			this.editPeriod(d, isMorning);
		});
	}

	public editDayPeriod(dayIndex: number) {
		this.editPeriod(this.weekDays[dayIndex], true);
		this.editPeriod(this.weekDays[dayIndex], false);
	}

	public editPeriod(date: DayInfo, isMorning: boolean) {
		if (this.cursorType == 'clear') {
			this.scheduleService.updateLesson(date, null, isMorning);
		}

		if (this.cursorType == 'add') {
			this.scheduleService.updateLesson(
				date,
				this.selectedModule ?? null,
				isMorning
			);
		}

		// this.weekDays = this.scheduleService.getWeek(this.date);
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

import { Component, OnInit } from '@angular/core';
import { MatButtonToggleChange, MatButtonToggleModule } from '@angular/material/button-toggle';
import { ActivatedRoute, Router } from '@angular/router';
import { ColorPickerComponent } from '@shared/components/color-picker/color-picker.component';
import { ModuleItem } from '@shared/components/module/module-select/module-select.component';
import { DateInfo, DateService } from '@shared/services/date.service';
import { SharedModule } from '@shared/shared.module';

@Component({
	selector: 'app-schedule-week',
	standalone: true,
	imports: [SharedModule, MatButtonToggleModule, ColorPickerComponent],
	templateUrl: './schedule-week.component.html',
	styleUrl: './schedule-week.component.scss'
})
export class ScheduleWeekComponent implements OnInit {

	public date!: Date;
	public weekDays: DateInfo[] = [];
	public weekLabels: string[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

	public modules: { name: string, color: string }[] = [
		{ name: "Module 1", color: "#25b4da" },
		{ name: "Module 2", color: "#f5a623" },
	]

	public cursorType: "add" | "clear" | null = null;

	public selectedModule: ModuleItem | null = null;

	constructor(
		private readonly router: Router,
		private readonly route: ActivatedRoute,
		public readonly dateService: DateService
	) { }

	public ngOnInit(): void {
		const date = this.route.snapshot.paramMap.get('date');

		if (!date) {
			this.router.navigate(['schedule']);
			return;
		}

		this.date = new Date(date);
		this.weekDays = this.dateService.generateWeek(this.date);
	}

	public onChange(event: MatButtonToggleChange) {
		this.cursorType = event.value;
	}

	public editPeriod(date: DateInfo, isMorning: boolean) {

		if (this.cursorType == "clear") {
			if (isMorning) date.moduleA = null;
			else date.moduleB = null;
		}

		if (this.cursorType == "add") {
			if (isMorning) date.moduleA = this.selectedModule;
			else date.moduleB = this.selectedModule;
		}
	}

	public formatTextColor(backgroundColor: string) {

		const color = this.hexToRgb(backgroundColor);

		if (!color) return "#FFF";

		const brightness = this.getBrightness(color);

		return brightness > 0.75 ? "#000" : "#FFF";
	}

	private hexToRgb(hex: string) {
		var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		return result ? {
			r: parseInt(result[1], 16),
			g: parseInt(result[2], 16),
			b: parseInt(result[3], 16)
		} : null;
	}

	private getBrightness(rgb: { r: number, g: number, b: number }): number {
		const { r, g, b } = rgb;

		return (((r * 299) + (g * 587) + (b * 114)) / 1000) / 255;
	}

}

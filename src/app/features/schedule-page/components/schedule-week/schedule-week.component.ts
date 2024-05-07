import { Component, OnInit } from '@angular/core';
import { MatButtonToggleChange, MatButtonToggleModule } from '@angular/material/button-toggle';
import { ActivatedRoute, Router } from '@angular/router';
import { ColorPickerComponent } from '@shared/components/color-picker/color-picker.component';
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

	public moduleColor: string = "#2fa296";

	public moduleColor2: string = "#fb9e00";


	public weekLabels: string[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

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
		console.log(event);
	}



}

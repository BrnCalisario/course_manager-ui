import { Component, OnInit } from '@angular/core';
import { DateService } from '@shared/services/date.service';
import ScheduleService from '@shared/services/schedule.service';
import { SharedModule } from '@shared/shared.module';

@Component({
	selector: 'app-schedule-page',
	standalone: true,
	imports: [SharedModule],
	templateUrl: './schedule-page.component.html',
	styleUrl: './schedule-page.component.scss'
})
export class SchedulePageComponent implements OnInit {

	constructor(
		private readonly dateService: DateService,
		private readonly scheduleService: ScheduleService) {
	}

	ngOnInit(): void {
		// this.scheduleService.scheduleDays = this.dateService.mockYearLessons(2024);
	}
}


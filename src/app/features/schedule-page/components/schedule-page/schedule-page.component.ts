import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { DateInfo, DateService } from "@shared/services/date.service";
import { SharedModule } from "@shared/shared.module";

@Component({
	selector: 'app-schedule-page',
	standalone: true,
	imports: [SharedModule],
	templateUrl: './schedule-page.component.html',
	styleUrl: './schedule-page.component.scss'
})
export class SchedulePageComponent {

	year: Array<Array<DateInfo>> = [];

	monthNames: string[] = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	weekNames: string[] = ["D", "S", "T", "Q", "Q", "S", "S"];

	constructor(private readonly router: Router, public readonly dateService: DateService) {
		this.year = dateService.generateYear();
	}

	public onMonthClick(monthNumber: number): void {

		const today = new Date();
		const date = new Date(today.getFullYear(), monthNumber, 1);

		this.router.navigate(['schedule', 'month', date.toDateString()]);
	}
}


import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import StorageService from '@shared/services/storage.service';
import { SharedModule } from '@shared/shared.module';

@Component({
	selector: 'app-class-list',
	standalone: true,
	imports: [SharedModule],
	templateUrl: './class-list.component.html',
	styleUrl: './class-list.component.scss'
})
export class ClassListComponent implements OnInit {

	classes: any[] = [];

	constructor(private readonly storageService: StorageService, private readonly router: Router) { }

	ngOnInit(): void {
		this.classes = this.storageService.getList('classes');
	}

	removeClass(index: number): void {

		this.classes.splice(index, 1);

		this.storageService.setList('classes', this.classes);
	}

	goToSchedule() {
		this.router.navigate(['/schedule', 'year']);
	}
}

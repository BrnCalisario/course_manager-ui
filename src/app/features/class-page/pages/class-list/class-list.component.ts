import { Component, OnInit } from '@angular/core';
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

	constructor(private readonly storageService: StorageService) { }

	ngOnInit(): void {
		this.classes = this.storageService.getList('classes');
	}
}

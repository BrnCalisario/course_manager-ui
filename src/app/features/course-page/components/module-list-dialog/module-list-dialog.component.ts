import { CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import Module from '@domain/module/module.model';
import ModuleService from '@shared/services/module.service';
import { SharedModule } from '@shared/shared.module';
import { Subject, debounceTime, takeUntil } from 'rxjs';
import ODataQueryCommand from 'src/lib/odata/ODataCommand';
import { ModuleItemComponent } from '../module-item/module-item.component';

@Component({
	selector: 'app-module-list-dialog',
	standalone: true,
	imports: [SharedModule, ModuleItemComponent],
	templateUrl: './module-list-dialog.component.html',
	styleUrl: './module-list-dialog.component.scss'
})
export class ModuleListDialogComponent implements OnInit, OnDestroy {

	@ViewChild('selectedList')
	public selectedListElement!: CdkDropList;

	@ViewChild('optionsList')
	public optionsListElement!: CdkDropList;

	public queryCommand: ODataQueryCommand<Module>;
	public destroy$: Subject<void> = new Subject();

	public selected: Module[] = []
	public options: Module[] = [];

	public searchControl = new FormControl<string>('', []);

	constructor(moduleService: ModuleService) {
		this.queryCommand = moduleService.listCommand();
	}

	public ngOnInit(): void {

		this.queryCommand.response$
			.pipe(takeUntil(this.destroy$))
			.subscribe(res => {
				this.options = res.value.filter(module => !this.selected.find(m => m.Id === module.Id));
			});

		this.searchControl.valueChanges.pipe(
			debounceTime(500),
		)
			.subscribe(text => {

				this.queryCommand.params = {
					$filter: { contains: { Name: text! } }
				};

				this.queryCommand.execute();

			});

		this.queryCommand.execute();
	}

	ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}

	drop(event: CdkDragDrop<Module[]>) {

		if (event.previousContainer === event.container) {
			moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
			return;
		}

		transferArrayItem(
			event.previousContainer.data,
			event.container.data,
			event.previousIndex,
			event.currentIndex
		);
	}
}

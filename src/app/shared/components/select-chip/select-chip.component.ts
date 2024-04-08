import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatChipSelectionChange } from "@angular/material/chips";
import { ReplaySubject, Subject, takeUntil } from 'rxjs';

@Component({
	selector: 'app-select-chip',
	templateUrl: './select-chip.component.html',
	styleUrl: './select-chip.component.scss',
})
export class SelectChipComponent implements OnInit, OnDestroy {

	@Input({ required: true })
	public options !: string[];

	@Input({ required: true })
	public selectedValues!: string[];

	@Output()
	public selectedValuesChange = new EventEmitter<string[]>();

	@Output()
	public onAdd = new EventEmitter<MouseEvent>();

	public _filteredTags: ReplaySubject<string[]> = new ReplaySubject<string[]>(
		1
	);

	public _inputCtrl: FormControl<string | null> = new FormControl<string>('');

	private _selectedCache: string[] = [];

	private destroy$ = new Subject<void>();

	public ngOnInit(): void {

		this._selectedCache = [...this.selectedValues];

		this._filterTags();

		this._inputCtrl.valueChanges
			.pipe(takeUntil(this.destroy$))
			.subscribe((value) => {
				this._filterTags(value);
			});
	}

	public ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}

	public clearInput() {
		this._inputCtrl.setValue('');
	}

	public onSelectionChange($event: MatChipSelectionChange): void {

		if (!$event.isUserInput) return;

		const { source: { value }, selected } = $event;

		if (selected) {
			this._selectedCache.push(value);
		} else {
			this._selectedCache = this._selectedCache.filter(item => item !== value);
		}

		this.selectedValuesChange.emit(this._selectedCache);
	}

	public isSelected = (item: string): boolean => this._selectedCache.includes(item);

	private _filterTags(filterValue?: string | null): void {
		if (!filterValue) {
			this._filteredTags.next(this.options.slice());
			return;
		}

		this._filteredTags.next(
			this.options.filter(option => option.toLowerCase().indexOf(filterValue.toLowerCase()) > -1)
		);
	}
}

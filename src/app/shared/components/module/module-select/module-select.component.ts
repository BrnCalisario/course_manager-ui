import {
	AfterContentChecked, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren,
	EventEmitter, Input, Output, QueryList
} from '@angular/core';

import Module from '@domain/module/module.model';
import { ModuleOption } from '../module-option/module-option.component';

export type ModuleItem = {
	name: string;
	color: string;
};

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'app-module-select',
	templateUrl: './module-select.component.html',
	styleUrl: './module-select.component.scss',
})
export class ModuleSelectComponent implements AfterContentChecked {
	@ContentChildren(ModuleOption)
	moduleOptions!: QueryList<ModuleOption>;

	options!: ModuleOption[];

	@Input()
	selected: Module | null = null;

	@Output()
	selectedChange: EventEmitter<Module | null> = new EventEmitter();

	constructor(private cdref: ChangeDetectorRef) { }

	ngAfterContentChecked(): void {
		this.options = this.moduleOptions.toArray();

		this.cdref.detectChanges();
	}

	public _onSelect(option: ModuleOption): void {
		const { selected } = option;

		this.options.forEach((opt) => {
			opt.selected = false;
		});

		option.selected = !selected;

		this.selected = option.module
			? option.module
			: null;

		this.selectedChange.emit(this.selected);
	}
}

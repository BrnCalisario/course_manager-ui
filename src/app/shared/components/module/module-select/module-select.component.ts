import { AfterContentInit, Component, ContentChildren, EventEmitter, Output, QueryList } from '@angular/core';
import { ModuleOption } from '../module-option/module-option.component';

@Component({
	selector: 'app-module-select',
	templateUrl: './module-select.component.html',
	styleUrl: './module-select.component.scss'
})
export class ModuleSelectComponent implements AfterContentInit {

	@ContentChildren(ModuleOption)
	moduleOptions!: QueryList<ModuleOption>;

	options!: ModuleOption[];

	selected: ModuleOption | null = null;

	@Output()
	public onSelect: EventEmitter<ModuleOption> = new EventEmitter<ModuleOption>();

	ngAfterContentInit(): void {
		this.options = this.moduleOptions.toArray();
	}

	public _onSelect(option: ModuleOption): void {

		const { selected } = option;

		this.options.forEach(opt => {
			opt.selected = false;
		});

		option.selected = !selected;

		this.selected = option.selected ? option : null;

		if (selected) this.onSelect.emit(option);
	}
}

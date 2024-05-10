import { AfterContentInit, Component, ContentChildren, QueryList } from '@angular/core';
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

	ngAfterContentInit(): void {
		this.options = this.moduleOptions.toArray();
	}

	public onSelect(option: ModuleOption): void {

		const { selected } = option;

		this.options.forEach(opt => {
			opt.selected = false;
		});

		option.selected = !selected;
	}
}

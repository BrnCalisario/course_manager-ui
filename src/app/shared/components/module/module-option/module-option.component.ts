import { Component, Input, TemplateRef, ViewChild } from '@angular/core';

@Component({
	selector: 'app-module-option',
	templateUrl: 'module-option.component.html',
	styleUrl: './module-option.component.scss'
})
export class ModuleOption {

	@ViewChild(TemplateRef)
	template!: TemplateRef<any>;

	public style: 'active' | 'disabled' | 'inactive' = 'inactive';

	public color: string = "#FFFF00";

	@Input()
	public name: string = "";

}

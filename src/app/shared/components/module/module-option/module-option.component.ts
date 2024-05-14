import { Component, EventEmitter, Input, TemplateRef, ViewChild } from '@angular/core';

@Component({
	selector: 'app-module-option',
	templateUrl: 'module-option.component.html',
	styleUrl: './module-option.component.scss'
})
export class ModuleOption {

	@ViewChild(TemplateRef)
	template!: TemplateRef<any>;

	@Input()
	public name: string = "";

	@Input()
	public color: string = "#52B2A8";

	public colorChange: EventEmitter<string> = new EventEmitter<string>();

	@Input()
	public set selected(value: boolean) {
		this._selected = value;
		this.style = value ? 'active' : 'inactive';
	}

	public get selected(): boolean {
		return this._selected;
	}

	public style: 'active' | 'disabled' | 'inactive' = 'inactive';

	private _selected: boolean = false;
}

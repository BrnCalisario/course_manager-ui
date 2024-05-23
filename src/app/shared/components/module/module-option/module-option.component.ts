import { Component, EventEmitter, Input, TemplateRef, ViewChild } from '@angular/core';
import Module from '@domain/module/module.model';

@Component({
	selector: 'app-module-option',
	templateUrl: 'module-option.component.html',
	styleUrl: './module-option.component.scss'
})
export class ModuleOption {

	@ViewChild(TemplateRef)
	template!: TemplateRef<any>;

	@Input()
	public module!: Module;

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

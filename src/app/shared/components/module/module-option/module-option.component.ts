import { Component, EventEmitter, Input, TemplateRef, ViewChild } from '@angular/core';
import Module from '@domain/module/module.model';
import StorageService, { StorageItem } from '@shared/services/storage.service';

@Component({
	selector: 'app-module-option',
	templateUrl: 'module-option.component.html',
	styleUrl: './module-option.component.scss'
})
export class ModuleOption {

	constructor(private readonly storageService: StorageService) { }

	@ViewChild(TemplateRef)
	template!: TemplateRef<any>;

	@Input()
	public module!: Module | StorageItem<Module>;

	public colorChange: EventEmitter<string> = new EventEmitter<string>();

	@Input()
	public set selected(value: boolean) {
		this._selected = value;
		this.style = value ? 'active' : 'inactive';
	}

	public get selected(): boolean {
		return this._selected;
	}

	onColorChange(color: string): void {
		this.module.Color = color;

		if ('Identificator' in this.module) {
			this.updateStorageModule(this.module, color);
		}

		this.colorChange.emit(color);
	}

	private updateStorageModule(module: StorageItem<Module>, color: string): void {

		const modules = this.storageService.getList<Module>('modules');

		let index = modules.findIndex((m) => m.Identificator === module.Identificator);

		if (index !== -1) {

			modules[index].Color = color;
			console.log("color changed");

			this.storageService.setList('modules', modules);
		}

	}

	public style: 'active' | 'disabled' | 'inactive' = 'inactive';

	private _selected: boolean = false;
}

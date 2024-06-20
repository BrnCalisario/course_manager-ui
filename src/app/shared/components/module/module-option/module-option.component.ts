import { Component, EventEmitter, Input, TemplateRef, ViewChild } from '@angular/core';
import Module from '@domain/module/module.model';
import ScheduleService from '@shared/services/schedule.service';
import StorageService, { StorageItem } from '@shared/services/storage.service';

@Component({
	selector: 'app-module-option',
	templateUrl: 'module-option.component.html',
	styleUrl: './module-option.component.scss'
})
export class ModuleOption {

	constructor(
		private readonly storageService: StorageService,
		private readonly scheduleService: ScheduleService) { }

	@ViewChild(TemplateRef)
	template!: TemplateRef<any>;

	@Input()
	public module!: Module | StorageItem<Module>;

	public colorChange: EventEmitter<string> = new EventEmitter<string>();

	public get canSelect() {
		return this.module.RemainingWorkload > 0;
	};

	@Input()
	public set selected(value: boolean) {

		if (value && !this.canSelect) return;

		this._selected = value;
		this.style = value ? 'active' : 'inactive';
	}

	public get selected(): boolean {
		return this._selected;
	}

	public style: 'active' | 'disabled' | 'inactive' = 'inactive';

	private _selected: boolean = false;

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

		this.scheduleService.updateModuleColor(module.Name, color);
	}
}

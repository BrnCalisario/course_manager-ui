import { Component, EventEmitter, Input, Output } from '@angular/core';
import Module from '@domain/module/module.model';
import { SharedModule } from '@shared/shared.module';

@Component({
	selector: 'app-module-card',
	standalone: true,
	imports: [SharedModule],
	templateUrl: './module-card.component.html',
	styleUrl: './module-card.component.scss'
})
export class ModuleCardComponent {

	@Input()
	public module !: Module;

	@Output()
	public onUpdate: EventEmitter<Module> = new EventEmitter();

	@Output()
	public onDelete: EventEmitter<Module> = new EventEmitter();

	public onDeleteClick() {
		this.onDelete.emit(this.module);
	}

	public onUpdateClick() {
		this.onUpdate.emit(this.module);
	}
}

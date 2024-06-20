import { Component, Input } from '@angular/core';
import Module from '@domain/module/module.model';
import { SharedModule } from '@shared/shared.module';

@Component({
	selector: 'app-module-item',
	standalone: true,
	imports: [SharedModule],
	templateUrl: './module-item.component.html',
	styleUrl: './module-item.component.scss'
})
export class ModuleItemComponent {

	@Input({ required: true })
	public item!: Module;
}

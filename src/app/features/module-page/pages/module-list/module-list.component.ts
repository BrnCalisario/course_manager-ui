import { Component } from '@angular/core';
import Module from '@domain/module/module.model';
import { ModuleCardComponent } from '@features/module-page/components/module-card/module-card.component';
import { SharedModule } from '@shared/shared.module';

@Component({
	selector: 'app-module-list',
	standalone: true,
	imports: [SharedModule, ModuleCardComponent],
	templateUrl: './module-list.component.html',
	styleUrl: './module-list.component.scss'
})
export class ModuleListComponent {
	modules: Module[] = [
		new Module(),
		new Module(),
		new Module(),
		new Module(),
		new Module(),
		new Module(),
		new Module(),
		new Module(),
	];
}

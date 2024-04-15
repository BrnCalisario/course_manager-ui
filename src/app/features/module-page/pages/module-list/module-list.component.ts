import { Component, OnInit } from '@angular/core';
import Module from '@domain/module/module.model';
import { ModuleCardComponent } from '@features/module-page/components/module-card/module-card.component';
import ModuleService from '@shared/services/module.service';
import { SharedModule } from '@shared/shared.module';
import ODataQueryCommand from 'src/lib/odata/ODataCommand';

@Component({
	selector: 'app-module-list',
	standalone: true,
	imports: [SharedModule, ModuleCardComponent],
	templateUrl: './module-list.component.html',
	styleUrl: './module-list.component.scss'
})
export class ModuleListComponent implements OnInit {

	public modules: Module[] = [];

	private queryCommand: ODataQueryCommand<Module>;

	constructor(moduleService: ModuleService) {
		this.queryCommand = moduleService.listCommand();
	}

	public ngOnInit(): void {
		this.queryCommand.response$
			.subscribe((res) => {
				this.modules = res.value;
			});

		this.queryCommand.execute();
	}
}

import { debounceTime, take } from 'rxjs';
import ODataQueryCommand from 'src/lib/odata/ODataCommand';
import { ODataSingleResponse } from 'src/lib/odata/types/ODataResponse';

import {
	Component,
	EventEmitter,
	HostListener,
	Input,
	OnInit,
	Output,
	ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import Module from '@domain/module/module.model';
import { ContextMenuComponent } from '@shared/components/context-menu/context-menu.component';
import { ConfirmDeleteDialog } from '@shared/components/delete-dialog/confirm-delete.component';
import {
	ContextMenuData,
	MenuItemEvent,
} from '@shared/models/context-menu.models';
import ModuleService from '@shared/services/module.service';
import { SharedModule } from '@shared/shared.module';

@Component({
	selector: 'app-modules-select-chip',
	standalone: true,
	imports: [SharedModule],
	templateUrl: './modules-select-chip.component.html',
	styleUrl: './modules-select-chip.component.scss',
})
export default class ModulesSelectChipComponent implements OnInit {
	@Input()
	public formModuleId?: string;

	@Input({ required: true })
	public modules!: Module[];

	@Output()
	public modulesChange = new EventEmitter<Module[]>();

	public queryCommand: ODataQueryCommand<Module>;

	public deleteCommand: ODataQueryCommand<
		Module,
		ODataSingleResponse<Module>
	>;

	public modulesOptions: Module[] = [];

	public selectedId?: string;

	public searchInput = new FormControl<string>('');

	constructor(
		private readonly dialog: MatDialog,
		private readonly moduleService: ModuleService
	) {
		this.queryCommand = this.moduleService.listCommand();
		this.deleteCommand = this.moduleService.deleteCommand(
			() => this.selectedId ?? ''
		);
	}

	public ngOnInit(): void {
		this.queryCommand.params = {
			$orderby: 'Name',
			$top: 20,
			$filter: this.formModuleId
				? {
						ne: {
							Id: `${this.formModuleId}`,
						},
				  }
				: {},
		};

		this.queryCommand.response$.subscribe((res) => {
			this.modulesOptions = res.value;
		});

		this.queryCommand.execute();

		this.searchInput.valueChanges
			.pipe(debounceTime(350))
			.subscribe((text) => {
				this.queryCommand.params = {
					$filter: {
						contains: {
							Name: text ?? '',
						},
						ne: this.formModuleId
							? {
									Id: `${this.formModuleId}`,
							  }
							: {},
					},
				};

				this.queryCommand.execute();
			});
	}

	public clearInput() {
		this.searchInput.setValue('');
	}

	public ToLabel(competence: Module): string {
		return competence.Name;
	}

	private openRemoveModal(event: MenuItemEvent<Module>) {
		const dialogRef = this.dialog.open(ConfirmDeleteDialog);

		dialogRef.componentInstance.entityId = event.item.Id;

		dialogRef.componentInstance.onConfirm.subscribe((id) => {
			this.selectedId = id;
			this.deleteCommand.execute();
		});

		this.deleteCommand.response$.pipe(take(1)).subscribe({
			next: () => {
				dialogRef.close();
				this.queryCommand.execute();
			},
			error: () => alert('Erro ao deletar'), // TODO: Feedback Service
		});
	}

	//#region ContextMenu Properties and Functions

	@ViewChild('contextmenu')
	public contextMenu!: ContextMenuComponent<Module>;

	public displayContextMenu: boolean = false;

	public contextMenuOptions: Array<ContextMenuData<Module>> = [
		{
			label: 'Remove',
			icon: 'delete',
			func: this.openRemoveModal.bind(this),
		},
	];

	@HostListener('document:click')
	documentClick(): void {
		this.displayContextMenu = false;
	}

	public showContextMenu(event: MouseEvent, option: Module) {
		event.preventDefault();

		const { clientX: x, clientY: y } = event;

		this.displayContextMenu = true;
		this.contextMenu.position = { x, y };
		this.contextMenu.selectedItem = option;
		this.displayContextMenu = true;
	}

	//#endregion
}

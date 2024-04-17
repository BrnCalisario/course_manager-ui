import { debounceTime, take } from 'rxjs';
import ODataQueryCommand from 'src/lib/odata/ODataCommand';
import { ODataSingleResponse } from 'src/lib/odata/types/ODataResponse';

import {
    Component, EventEmitter, HostListener, Input, OnInit, Output, ViewChild
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Competence } from '@domain/competence/competence.models';
import Module from '@domain/module/module.model';
import { ContextMenuComponent } from '@shared/components/context-menu/context-menu.component';
import { ConfirmDeleteDialog } from '@shared/components/delete-dialog/confirm-delete.component';
import { ContextMenuData, MenuItemEvent } from '@shared/models/context-menu.models';
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
	@Input({ required: true })
	public modules!: Module[];

	@Output()
	public modulesChange = new EventEmitter<Module[]>();

	public queryCommand: ODataQueryCommand<Module>;

	public deleteCommand: ODataQueryCommand<Module, ODataSingleResponse<Module>>;

	public modulesOptions: Module[] = [];

	public selectedId?: number;

	public searchInput = new FormControl<string>('');

	constructor(
		private readonly dialog: MatDialog,
		private readonly moduleService: ModuleService
	) {
		this.queryCommand = this.moduleService.listCommand();
		this.deleteCommand = this.moduleService.deleteCommand(() => this.selectedId ?? 0);
	}

	public ngOnInit(): void {
		this.queryCommand.params = {
			$orderby: 'Name',
			$top: 20,
		};

		this.queryCommand.response$.pipe(
			take(1))
			.subscribe((res) => {
				this.modulesOptions = res.value;
			});

		this.queryCommand.execute();

		this.searchInput.valueChanges
			.pipe(debounceTime(350))
			.subscribe(text => {
				this.queryCommand.params = {
					$filter: {
						contains: {
							Name: text ?? '',
						},
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

	private openRemoveModal(event: MenuItemEvent<Competence>) {

		const dialogRef = this.dialog.open(ConfirmDeleteDialog);

		dialogRef.componentInstance.entityId = event.item.Id;

		dialogRef.componentInstance.onConfirm
			.subscribe(id => {
				this.selectedId = id;
				this.deleteCommand.execute();
			});

		this.deleteCommand.response$
			.pipe(take(1))
			.subscribe({
				next: () => {
					dialogRef.close();
					this.queryCommand.execute();
				},
				error: () => alert("Erro ao deletar") // TODO: Feedback Service
			})
	}

	//#region ContextMenu Properties and Functions

	@ViewChild('contextmenu')
	public contextMenu!: ContextMenuComponent<Competence>;

	public displayContextMenu: boolean = false;

	public contextMenuOptions: Array<ContextMenuData<Competence>> = [
		{ label: 'Remove', icon: 'delete', func: this.openRemoveModal.bind(this) }
	];

	@HostListener('document:click')
	documentClick(): void {
		this.displayContextMenu = false;
	}

	public showContextMenu(event: MouseEvent, option: Competence) {
		event.preventDefault();

		const { clientX: x, clientY: y } = event;

		this.displayContextMenu = true;
		this.contextMenu.position = { x, y };
		this.contextMenu.selectedItem = option;
		this.displayContextMenu = true;
	}

	//#endregion
}

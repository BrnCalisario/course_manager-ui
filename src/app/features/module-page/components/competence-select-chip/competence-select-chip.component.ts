import { debounceTime, take } from 'rxjs';
import ODataQueryCommand from 'src/lib/odata/ODataCommand';
import { ODataSingleResponse } from 'src/lib/odata/types/ODataResponse';

import {
    Component, EventEmitter, HostListener, Input, OnInit, Output, ViewChild
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Competence } from '@domain/competence/competence.models';
import { CompetenceDialogComponent } from '@features/competence-dialog/competence-dialog.component';
import { ContextMenuComponent } from '@shared/components/context-menu/context-menu.component';
import { ConfirmDeleteDialog } from '@shared/components/delete-dialog/confirm-delete.component';
import { ContextMenuData, MenuItemEvent } from '@shared/models/context-menu.models';
import CompetenceService from '@shared/services/competence.service';
import { SharedModule } from '@shared/shared.module';

@Component({
	selector: 'app-competence-select-chip',
	standalone: true,
	imports: [SharedModule],
	templateUrl: './competence-select-chip.component.html',
	styleUrl: './competence-select-chip.component.scss',
})
export default class CompetenceSelectChipComponent implements OnInit {
	@Input({ required: true })
	public competences!: Competence[];

	@Output()
	public competencesChange = new EventEmitter<Competence[]>();

	public queryCommand: ODataQueryCommand<Competence>;

	public deleteCommand: ODataQueryCommand<Competence, ODataSingleResponse<Competence>>;

	public competenceOptions: Competence[] = [];

	public nameMaxLength = 100;

	public selectedId?: number;

	public searchInput = new FormControl<string>('');

	constructor(
		private readonly dialog: MatDialog,
		private readonly competenceService: CompetenceService
	) {
		this.queryCommand = this.competenceService.listCommand();
		this.deleteCommand = this.competenceService.deleteCommand(() => this.selectedId!);
	}

	public ngOnInit(): void {
		this.queryCommand.params = {
			$orderby: 'Name',
			$top: 20,
		};

		this.queryCommand.response$.pipe(
			take(1))
			.subscribe((res) => {
				this.competenceOptions = res.value;
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

	public ToLabel(competence: Competence): string {
		return competence.Name;
	}

	public openCreateDialog(): void {
		const dialogRef = this.dialog.open(CompetenceDialogComponent);

		dialogRef.componentInstance.editMode = false;

		dialogRef.componentInstance.onSave
			.pipe(take(1))
			.subscribe(
				(competence: Competence) => {
					this.competenceOptions = [
						...this.competenceOptions,
						competence,
					];
				}
			);
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
					// this.competenceOptions = this.competenceOptions.filter(competence => competence.Id !== res.Id)
					this.queryCommand.execute();
				},
				error: () => alert("Erro ao deletar") // TODO: Feedback Service
			});
	}

	private openEditModal(event: MenuItemEvent<Competence>) {
		const dialogRef = this.dialog.open(CompetenceDialogComponent);

		dialogRef.componentInstance.editMode = true;
		dialogRef.componentInstance.entity = event.item;

		dialogRef.componentInstance.onSave
			.pipe(take(1))
			.subscribe(
				(res: Competence) => {
					this.competenceOptions = this.competenceOptions.map(comp => {

						if (comp.Id === res.Id) {
							comp.Name = res.Name;
						}

						return comp;
					})

				}
			);
	}

	//#region ContextMenu Properties and Functions

	@ViewChild('contextmenu')
	public contextMenu!: ContextMenuComponent<Competence>;

	public displayContextMenu: boolean = false;

	public contextMenuOptions: Array<ContextMenuData<Competence>> = [
		{ label: 'Edit', icon: 'edit', func: this.openEditModal.bind(this) },
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

import { debounceTime, Subject, take, takeUntil } from 'rxjs';
import ODataQueryCommand from 'src/lib/odata/ODataCommand';

import { Component, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Competence } from '@domain/competence/competence.models';
import { CompetenceDialogComponent } from '@features/competence-dialog/competence-dialog.component';
import { DeleteCompetenceDialog } from '@features/competence-dialog/delete-competence-dialog/delete-competence-dialog.component';
import { ContextMenuComponent } from '@shared/components/context-menu/context-menu.component';
import { ContextMenuData, MenuItemEvent } from '@shared/models/contex-tmenu.models';
import CompetenceService from '@shared/services/competence.service';
import { SharedModule } from '@shared/shared.module';
import { ODataSingleResponse } from 'src/lib/odata/types/ODataResponse';

@Component({
	selector: 'app-competence-select-chip',
	standalone: true,
	imports: [SharedModule],
	templateUrl: './competence-select-chip.component.html',
	styleUrl: './competence-select-chip.component.scss',
})
export default class CompetenceSelectChipComponent implements OnInit, OnDestroy {

	@Input({ required: true })
	public competences!: Competence[];

	@Output()
	public competencesChange = new EventEmitter<Competence[]>();

	public queryCommand: ODataQueryCommand<Competence>;

	public deleteCommand: ODataQueryCommand<Competence, ODataSingleResponse<Competence>>;

	public competenceOptions: Competence[] = [];

	public nameMaxLength = 100;

	public selectedId?: string;

	public searchInput = new FormControl<string>('', [
		Validators.maxLength(this.nameMaxLength),
	]);

	private destroy$ = new Subject<void>();

	constructor(
		private readonly dialog: MatDialog,
		private readonly competenceService: CompetenceService
	) {
		this.queryCommand = this.competenceService.listCommand();
		this.deleteCommand = this.competenceService.deleteCommand(() => this.selectedId ?? '');
	}

	public ngOnInit(): void {
		this.queryCommand.params = {
			$orderby: 'Name',
			$top: 20,
		};

		this.queryCommand.response$.pipe(
			takeUntil(this.destroy$))
			.subscribe((res) => {
				this.competenceOptions = res.value;
			});

		this.queryCommand.execute();

		this.searchInput.valueChanges.pipe(
			debounceTime(350))
			.subscribe(_ => {
				this.queryCommand.params = {
					$filter: {
						contains: {
							Name: this.searchInput.value ?? '',
						},
					},
				};

				this.queryCommand.execute();
			});
	}

	public ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}

	public clearInput() {
		this.searchInput.setValue('');
	}

	public ToLabel(competence: Competence): string {
		return competence.Name;
	}

	public handleMenuItemClick(event: MenuItemEvent<Competence>) {
		console.log("event: ", event.type);
		console.log("competence id: ", event.item.Id);

		const { type: eventType, item: { Id: competenceId } } = event;

		eventType

		switch (eventType) {
			case "Edit":
				this.openEditModal(competenceId);
				break;
			case "Remove":
				this.openRemoveModal(competenceId);
				break;
			default:
				break;
		}
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

	private openRemoveModal(competenceId: string) {

		const dialogRef = this.dialog.open(DeleteCompetenceDialog);

		dialogRef.componentInstance.entityId = competenceId;

		dialogRef.componentInstance.onConfirm
			.subscribe(id => {
				this.selectedId = id;
				this.deleteCommand.execute();
			});

		this.deleteCommand.response$.pipe(
			take(1))
			.subscribe({
				next: (res) => {
					dialogRef.close();
					// this.competenceOptions = this.competenceOptions.filter(competence => competence.Id !== res.Id)
					this.queryCommand.execute();
				},
				error: () => alert("Erro ao deletar") // TODO: Feedback Service
			})
	}

	private openEditModal(competenceId: string) {
		//TODO: Implement edit modal

		const dialogRef = this.dialog.open(CompetenceDialogComponent);

		dialogRef.componentInstance.editMode = true;

		dialogRef.componentInstance.onSave
			.pipe(take(1))
			.subscribe(
				(competence: Competence) => {
					this.competenceOptions = this.competenceOptions.map(c => {
						if (c.Id === competence.Id)
							c.Name = competence.Name;
						return c;
					})
				}
			)
	}

	//#region ContextMenu Properties and Functions

	@ViewChild('contextmenu')
	public contextMenu!: ContextMenuComponent<Competence>;

	public displayContextMenu: boolean = false;

	//TODO: Pass click event as parameter
	public contextMenuOptions: Array<ContextMenuData> = [
		{ label: 'Edit', icon: 'edit' },
		{ label: 'Remove', icon: 'delete' }
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

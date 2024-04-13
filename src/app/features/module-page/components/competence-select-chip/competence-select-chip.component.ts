import { debounceTime, Subject, take } from 'rxjs';
import ODataQueryCommand from 'src/lib/odata/ODataCommand';

import { Component, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Competence } from '@domain/competence/competence.models';
import { CompetenceDialogComponent } from '@features/competence-dialog/competence-dialog.component';
import { DeleteCompetenceDialog } from '@features/competence-dialog/delete-competence-dialog/delete-competence-dialog.component';
import { ContextMenuComponent, ContextMenuData, MenuItemEvent } from '@shared/components/context-menu/context-menu.component';
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

	@ViewChild('contextmenu')
	public contextMenu!: ContextMenuComponent;

	public queryCommand: ODataQueryCommand<Competence>;
	public deleteCommand: ODataQueryCommand<Competence, ODataSingleResponse<Competence>>;

	public competenceOptions: Competence[] = [];
	public nameMaxLength = 100;

	public isDisplayContextMenu: boolean = true;
	public rightClickMenuItems: Array<ContextMenuData> = [];
	public rightClickMenuPosition: { x: number, y: number } = { x: 0, y: 0 };
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

		this.queryCommand.response$.subscribe((res) => {
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

	public openDialog(): void {
		const dialogRef = this.dialog.open(CompetenceDialogComponent);

		dialogRef.componentInstance.onSave.subscribe(
			(competence: Competence) => {
				this.competenceOptions = [
					...this.competenceOptions,
					competence,
				];
			}
		);
	}

	public clearInput() {
		this.searchInput.setValue('');
	}

	public ToLabel(competence: Competence): string {
		return competence.Name;
	}


	displayContextMenu(event: MouseEvent, option: Competence) {

		event.preventDefault();

		this.isDisplayContextMenu = true;

		this.contextMenu.selectedItem = option;

		this.rightClickMenuItems = [
			{ label: 'Edit', icon: 'edit' },
			{ label: 'Remove', icon: 'delete' }
		];

		this.rightClickMenuPosition = { x: event.clientX, y: event.clientY };
	}

	@HostListener('document:click')
	documentClick(): void {
		this.isDisplayContextMenu = false;
	}

	public getContextMenuStyle() {
		return {
			display: this.isDisplayContextMenu ? 'block' : 'none',
			position: 'fixed',
			left: `${this.rightClickMenuPosition.x}px`,
			top: `${this.rightClickMenuPosition.y}px`
		}
	}

	handleMenuItemClick(event: MenuItemEvent) {
		console.log("event: ", event.type);
		console.log("competence id: ", event.item.Id);

		//TODO: On Edit, On Remove

		const dialogRef = this.dialog.open(DeleteCompetenceDialog);

		dialogRef.componentInstance.entityId = event.item.Id;

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
}

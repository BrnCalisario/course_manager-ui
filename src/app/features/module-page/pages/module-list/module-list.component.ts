import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import Module from '@domain/module/module.model';
import { ModuleCardComponent } from '@features/module-page/components/module-card/module-card.component';
import { ConfirmDeleteDialog } from '@shared/components/delete-dialog/confirm-delete.component';
import ModuleService from '@shared/services/module.service';
import { SharedModule } from '@shared/shared.module';
import { Subject, take, takeUntil } from 'rxjs';
import ODataQueryCommand from 'src/lib/odata/ODataCommand';
import { ODataSingleResponse } from 'src/lib/odata/types/ODataResponse';

@Component({
	selector: 'app-module-list',
	standalone: true,
	imports: [SharedModule, ModuleCardComponent],
	templateUrl: './module-list.component.html',
	styleUrl: './module-list.component.scss'
})
export class ModuleListComponent implements OnInit, OnDestroy {

	public modules: Module[] = [];

	private queryCommand: ODataQueryCommand<Module>;

	private deleteCommand: ODataQueryCommand<Module, ODataSingleResponse<Module>>;

	private targetId?: string;

	private destroy$: Subject<void> = new Subject<void>();

	constructor(
		private readonly dialog: MatDialog,
		private readonly router: Router,
		moduleService: ModuleService) {
		this.queryCommand = moduleService.listCommand();
		this.deleteCommand = moduleService.deleteCommand(() => this.targetId!);
	}

	public ngOnInit(): void {
		this.queryCommand.response$.pipe(takeUntil(this.destroy$))
			.subscribe((res) => {
				this.modules = res.value;
			});

		this.queryCommand.execute();
	}

	public ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}

	onDeleteModule(module: Module) {

		const dialogRef = this.dialog.open(ConfirmDeleteDialog);

		dialogRef.componentInstance.entityId = module.Id

		const confirmSub$ = dialogRef.componentInstance.onConfirm
			.pipe(takeUntil(this.destroy$))
			.subscribe(moduleId => {
				this.targetId = moduleId;
				this.deleteCommand.execute();
			});

		dialogRef.afterClosed().subscribe(() => confirmSub$.unsubscribe());

		this.deleteCommand.response$.pipe(take(1), takeUntil(this.destroy$))
			.subscribe((res) => {
				dialogRef.close();
				this.modules = this.modules.filter(m => m.Id !== res.Id);
			})
	}

	onEditModule(module: Module) {
		this.router.navigate(["/module", "form", module.Id]);
	}
}

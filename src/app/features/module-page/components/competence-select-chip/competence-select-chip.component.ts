import { Subject, takeUntil } from 'rxjs';
import ODataQueryCommand from 'src/lib/odata/ODataCommand';

import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Competence } from '@domain/competence/competence.models';
import { CompetenceDialogComponent } from '@features/competence-dialog/competence-dialog.component';
import CompetenceService from '@shared/services/competence.service';
import { SharedModule } from '@shared/shared.module';

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
	public competenceOptions: Competence[] = [];
	public nameMaxLength = 100;

	public searchInput = new FormControl<string>('', [
		Validators.maxLength(this.nameMaxLength),
	]);

	private destroy$ = new Subject<void>();

	constructor(
		private readonly dialog: MatDialog,
		private readonly competenceService: CompetenceService
	) {
		this.queryCommand = this.competenceService.listCommand();
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

		this.searchInput.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(_ => {
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
}

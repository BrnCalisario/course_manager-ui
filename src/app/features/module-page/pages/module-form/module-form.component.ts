import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CompetenceDialogComponent } from '@features/competence-dialog/competence-dialog.component';
import CompetenceService from '@shared/services/competence.service';
import { SharedModule } from '@shared/shared.module';

@Component({
	selector: 'app-module-form',
	standalone: true,
	imports: [SharedModule],
	templateUrl: './module-form.component.html',
	styleUrl: './module-form.component.scss',
})
export default class ModuleFormComponent implements OnInit {
	public moduleForm: FormGroup;

	public selectedChips: string[] = [];

	// public _getCompetencesCommand: ODataCommand<Competence>;

	public chipOptions: string[] = []

	constructor(
		private readonly dialog: MatDialog,
		private readonly competenceService: CompetenceService) {
		this.moduleForm = this.initForm();
		// this._getCompetencesCommand = this.competenceService.getCommand();
	}

	public ngOnInit(): void {
		// this._getCompetencesCommand.createSubscription((sub) => {
		// 	sub.subscribe(res => {
		// 		this.chipOptions = res.value.map(item => item.Name);
		// 	})
		// })
	}

	public openDialog(): void {
		this.dialog.open(CompetenceDialogComponent);
	}

	onClick() {
		console.log("chips", this.selectedChips);
	}

	onAdd($event: MouseEvent) {
		console.log($event);
	}

	private initForm() {
		return new FormGroup({
			Name: new FormControl<string>('', Validators.required),
			Description: new FormControl<string>('', Validators.maxLength(500)),
			Objectives: new FormControl<string>('', Validators.maxLength(500)),
			Workload: new FormControl<number | null>(null, [
				Validators.required,
				Validators.min(1),
				Validators.max(200),
			]),
		});
	}
}

import { map, take } from 'rxjs';
import { removeODataProperties } from 'src/lib/odata/types/ODataResponse';

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute, Router } from '@angular/router';
import { Competence } from '@domain/competence/competence.models';
import Module from '@domain/module/module.model';
import CompetenceSelectChipComponent from '@features/module-page/components/competence-select-chip/competence-select-chip.component';
import ModulesSelectChipComponent from '@features/module-page/components/modules-select-chip/modules-select-chip.component';
import ModuleService from '@shared/services/module.service';
import StorageService from '@shared/services/storage.service';
import { SharedModule } from '@shared/shared.module';

@Component({
	selector: 'app-module-form',
	standalone: true,
	imports: [
		SharedModule,
		CompetenceSelectChipComponent,
		ModulesSelectChipComponent,
		MatTabsModule,
	],
	templateUrl: './module-form.component.html',
	styleUrl: './module-form.component.scss',
})
export default class ModuleFormComponent implements OnInit {
	public moduleForm: FormGroup;

	public isEdit: boolean = false;

	public isLoading: boolean = false;

	public formModuleId?: string;

	constructor(
		private readonly service: ModuleService,
		private readonly router: Router,
		private readonly route: ActivatedRoute,
		private readonly storageService: StorageService
	) {
		this.moduleForm = new FormGroup({
			Name: new FormControl<string>('', [
				Validators.required,
				Validators.maxLength(100),
			]),
			Description: new FormControl<string>('', [
				Validators.required,
				Validators.maxLength(500),
			]),
			Objective: new FormControl<string>('', [
				Validators.required,
				Validators.maxLength(500),
			]),
			Workload: new FormControl<number | null>(null, [
				Validators.required,
				Validators.min(1),
				Validators.max(200),
			]),
			Color: new FormControl<string>('#ffffff', [
				Validators.required,
				Validators.maxLength(7),
			]),
			Competences: new FormControl<Competence[]>([]),
			Dependencies: new FormControl<Module[]>([]),
		});
	}

	public ngOnInit(): void {
		this.formModuleId = this.route.snapshot.params['id'];

		if (!this.formModuleId) return;

		this.isEdit = true;

		const findCommand = this.service.findCommand(() => this.formModuleId!);

		findCommand.params = {
			$expand: 'Competences, Dependencies',
		};

		findCommand.response$
			.pipe(
				map((res) => removeODataProperties(res)),
				take(1)
			)
			.subscribe({
				next: (res: any) => {
					delete res.ModuleCompetences;
					delete res.ModuleDependencies;
					delete res.ModuleDependents;

					this.moduleForm.setValue(res);
				},
				error: (_) => {
					this.router.navigate(['/module', 'form']);
				},
				complete: () => {
					this.isLoading = false;
				},
			});

		this.isLoading = true;
		findCommand.execute();
	}

	public get competences(): Competence[] {
		return this.moduleForm.get('Competences')!.value;
	}

	public set competences(value: Competence[]) {
		this.moduleForm.get('Competences')!.setValue(value);
	}

	public get modules(): Module[] {
		return this.moduleForm.get('Dependencies')!.value;
	}

	public set modules(value: Module[]) {
		this.moduleForm.get('Dependencies')!.setValue(value);
	}

	public onSubmit() {
		const body = this.moduleForm.value;

		if (this.formModuleId) {
			body.Id = this.formModuleId;
		}

		body.RemainingWorkload = body.Workload;

		this.storageService.appendList('modules', body);

		this.service.save(body, this.isEdit).subscribe({
			next: () => {
				this.router.navigate(['/module', 'list']);
			},
			error: () => alert('An error occurred while creating the module.'),
		});
	}

	public returnToList() {
		this.router.navigate(['module', 'list']);
	}
}

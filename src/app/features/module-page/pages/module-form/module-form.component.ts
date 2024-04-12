import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Competence } from '@domain/competence/competence.models';
import CompetenceSelectChipComponent from '@features/module-page/components/competence-select-chip/competence-select-chip.component';
import ModuleService from '@shared/services/module.service';
import { SharedModule } from '@shared/shared.module';

@Component({
	selector: 'app-module-form',
	standalone: true,
	imports: [SharedModule, CompetenceSelectChipComponent],
	templateUrl: './module-form.component.html',
	styleUrl: './module-form.component.scss',
})
export default class ModuleFormComponent {
	public moduleForm: FormGroup = new FormGroup({
		Name: new FormControl<string>('', Validators.required),
		Description: new FormControl<string | null>(
			null,
			Validators.maxLength(500)
		),
		Objective: new FormControl<string | null>(
			null,
			Validators.maxLength(500)
		),
		Workload: new FormControl<number | null>(null, [
			Validators.required,
			Validators.min(1),
			Validators.max(200),
		]),
		Competences: new FormControl<Competence[]>([]),
	});

	constructor(
		private readonly service: ModuleService,
		private readonly router: Router
	) { }

	public get competences(): Competence[] {
		return this.moduleForm.get('Competences')!.value;
	}

	public onSubmit() {
		const command = this.service.postCommand(() => this.moduleForm.value);

		command.response$.subscribe({
			next: () => this.router.navigate(['/module', 'list']),
			error: () => alert('An error occurred while creating the module.'), // Todo - Use feedback service
		});

		command.execute();
	}
}

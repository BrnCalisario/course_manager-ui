import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Competence } from '@domain/competence/competence.models';
import CompetenceSelectChipComponent from '@features/module-page/components/competence-select-chip/competence-select-chip.component';
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
		Objectives: new FormControl<string | null>(
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

	public get competences(): Competence[] {
		return this.moduleForm.get('Competences')!.value;
	}

	public onSubmit() {
		console.log(this.moduleForm.value);
	}
}

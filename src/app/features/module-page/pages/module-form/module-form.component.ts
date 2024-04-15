import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Competence } from '@domain/competence/competence.models';
import Module from '@domain/module/module.model';
import CompetenceSelectChipComponent from '@features/module-page/components/competence-select-chip/competence-select-chip.component';
import ModuleService from '@shared/services/module.service';
import { SharedModule } from '@shared/shared.module';
import { ODataSingleResponse } from 'src/lib/odata/types/ODataResponse';

@Component({
	selector: 'app-module-form',
	standalone: true,
	imports: [SharedModule, CompetenceSelectChipComponent],
	templateUrl: './module-form.component.html',
	styleUrl: './module-form.component.scss',
})
export default class ModuleFormComponent implements OnInit {

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


	public isEdit: boolean = false;

	constructor(
		private readonly service: ModuleService,
		private readonly router: Router,
		private readonly route: ActivatedRoute,
	) { }

	public ngOnInit(): void {
		const id: string | undefined = this.route.snapshot.params['id'];

		if (!id) return;

		this.isEdit = true;

		const findCommand = this.service.findCommand(() => id);


		findCommand.params = {
			$expand: "Competences"
		};

		findCommand.response$
			.subscribe({
				next: (res: ODataSingleResponse<Module>) => {

					const { '@odata.context': _, ...module } = res;

					this.moduleForm.setValue(module);

				},
				error: _ => {
					this.router.navigate(["/module", "form"]);
				}
			})




		findCommand.execute();


		// this.service.getById(id)
		// 	.subscribe({
		// 		next: (value: Module) => {


		// 			const { Name, Description, Objective, Workload } = value;

		// 			this.moduleForm.setValue({ Name, Description, Objective, Workload, Competences: [] })
		// 		},
		// 		error: _ => {
		// 			this.router.navigate(["/module", "form"]);
		// 		}
		// 	});

	}

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

import { Injectable } from "@angular/core";
import CompetenceEndpoint from "@domain/competence/competence.endpoint";
import { Competence } from "@domain/competence/competence.models";
import { Observable } from "rxjs";
import ODataCommand from "src/lib/odata/ODataCommand";

@Injectable({ providedIn: 'root' })
export default class CompetenceService {

	private _getCommand?: ODataCommand<Competence>;

	constructor(private readonly endpoint: CompetenceEndpoint) { }

	public getCommand(): ODataCommand<Competence> {

		if (!this._getCommand) {
			const command = new ODataCommand<Competence>((command) => {
				return this.endpoint.getAll(command.build());
			})

			this._getCommand = command;
		}

		return this._getCommand;
	}

	public post(competence: Competence): Observable<Competence> {
		return this.endpoint.create(competence);
	}

	// public postCommand(builder: () => Competence): ODataCommand<Competence> {

	// 	const command = new ODataCommand<Competence>(_ => {
	// 		return this.endpoint.create(builder());
	// 	})

	// 	return command;
	// }

}

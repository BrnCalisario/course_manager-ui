import ODataCommand from 'src/lib/odata/ODataCommand';

import { Injectable } from '@angular/core';
import { UserEndpoint } from '@domain/user/user.endpoint';
import User from '@domain/user/user.model';

@Injectable({ providedIn: 'root' })
export default class UserService {

	private _queryCommand?: ODataCommand<User>;

	constructor(private readonly endpoint: UserEndpoint) {

	}

	public queryCommand(): ODataCommand<User> {

		if (!this._queryCommand) {

			const command = new ODataCommand<User>((command) =>
				this.endpoint.getAll(command.build())
			);

			this._queryCommand = command;
		}

		return this._queryCommand;
	}
}

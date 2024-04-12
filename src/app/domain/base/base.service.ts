import ODataQueryCommand from 'src/lib/odata/ODataCommand';
import { ODataListResponse, ODataSingleResponse } from 'src/lib/odata/types/ODataResponse';

import { Injectable } from '@angular/core';

import { BaseEndpoint } from './base.endpoint';
import BaseEntity from './base.entity';

@Injectable()
abstract class BaseService<TKey, TEntity extends BaseEntity<TKey>> {
	protected _queryCommand?: ODataQueryCommand<TEntity, ODataListResponse<TEntity>>;

	constructor(protected readonly endpoint: BaseEndpoint<TKey, TEntity>) { }

	public listCommand(): ODataQueryCommand<TEntity, ODataListResponse<TEntity>> {
		if (!this._queryCommand) {
			const command = new ODataQueryCommand<TEntity, ODataListResponse<TEntity>>((command) =>
				this.endpoint.getAll(command.build())
			);

			this._queryCommand = command;
		}

		return this._queryCommand;
	}

	public postCommand(builder: () => TEntity): ODataQueryCommand<TEntity, ODataSingleResponse<TEntity>> {
		const command = new ODataQueryCommand<TEntity, ODataSingleResponse<TEntity>>(() => {
			return this.endpoint.create(builder());
		})

		return command;
	}
}

export default BaseService;
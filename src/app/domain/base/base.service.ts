import ODataQueryCommand from 'src/lib/odata/ODataCommand';
import { ODataListResponse, ODataSingleResponse } from 'src/lib/odata/types/ODataResponse';

import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { BaseEndpoint } from './base.endpoint';
import BaseEntity from './base.entity';

@Injectable()
abstract class BaseService<TKey, TEntity extends BaseEntity<TKey>> {
	protected _queryCommand?: ODataQueryCommand<TEntity, ODataListResponse<TEntity>>;

	constructor(protected readonly endpoint: BaseEndpoint<TKey, TEntity>) { }

	public getById(id: TKey): Observable<TEntity> {
		return this.endpoint.get(id);
	}

	public findCommand(fnId: () => TKey): ODataQueryCommand<TEntity, ODataSingleResponse<TEntity>> {
		const command = new ODataQueryCommand<TEntity, ODataSingleResponse<TEntity>>(() => {
			return this.endpoint.get(fnId());
		})

		return command;
	}

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

	public saveCommand(builder: () => TEntity, isEdit: boolean): ODataQueryCommand<TEntity, ODataSingleResponse<TEntity>> {

		const command = new ODataQueryCommand<TEntity, ODataSingleResponse<TEntity>>(() => {
			const method = isEdit ? this.endpoint.create : this.endpoint.update;
			return method(builder());
		})

		return command;
	}

	public deleteCommand(fnId: () => TKey): ODataQueryCommand<TEntity, ODataSingleResponse<TEntity>> {
		const command = new ODataQueryCommand<TEntity, ODataSingleResponse<TEntity>>(() => {
			return this.endpoint.delete(fnId());
		})

		return command;
	}
}

export default BaseService;

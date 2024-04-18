import { BehaviorSubject, Observable, Subject, finalize, switchMap, take } from 'rxjs';

import ICommand from './types/ICommand';
import ODataParams, { ODataFilter } from './types/ODataParams';
import ODataResponse, { ODataListResponse } from './types/ODataResponse';
import RequestConstructor from './types/RequestConstructor';

/**
 * Represents an OData command that can be executed to retrieve data.
 * @template TEntity - The type of data returned by the OData command.
 */
class ODataQueryCommand<TEntity, TResponse extends ODataResponse<TEntity> = ODataListResponse<TEntity>> implements ICommand {
	private _params: ODataParams<TEntity> = {};
	private _executeOnChange = false;

	private _isExecuting$ = new BehaviorSubject(false);
	private _request$: Subject<{}> = new Subject();
	private _response$: Subject<TResponse> = new Subject();

	constructor(private readonly requestConstructor: RequestConstructor<TEntity, TResponse>) { }

	/**
	 * Gets the parameters for the OData query.
	 * @returns The OData parameters.
	 */
	public get params(): ODataParams<TEntity> {
		return this._params;
	}

	public get isExecuting$(): Observable<boolean> {
		return this._isExecuting$;
	}

	/**
	 * Sets the parameters for the OData query.
	 * @param newParams - The OData parameters to be set.
	 */
	public set params(newParams: ODataParams<TEntity>) {
		const checkParams = { ...this._params, ...newParams };

		if (checkParams.$top && checkParams.$top < 0) {
			delete checkParams.$top;
		}

		if (checkParams.$skip && checkParams.$skip < 0) {
			delete checkParams.$skip;
		}

		if (checkParams.$filter && this.buildFilter(checkParams.$filter) === '') {
			delete checkParams.$filter;
		}

		if (checkParams.$orderby && checkParams.$orderby === '') {
			delete checkParams.$orderby;
		}

		this._params = checkParams;

		if (this._executeOnChange) {
			this.execute();
		}
	}

	public get response$(): Observable<TResponse> {
		return this._response$;
	}

	/**
	 * Builds the OData query string.
	 * @returns The OData query string.
	 */
	public build(): string {
		const builder: string[] = [];

		if (this._params?.$count) {
			builder.push('$count=true');
		}

		if (this._params?.$skip) {
			builder.push(`$skip=${this._params.$skip}`);
		}

		if (this._params?.$top) {
			builder.push(`$top=${this._params.$top}`);
		}

		if (this._params?.$filter) {
			builder.push(`$filter=${this.buildFilter(this._params.$filter)}`);
		}

		if (this._params?.$orderby) {
			builder.push(`$orderby=${String(this._params.$orderby)}`);
		}

		if (this._params?.$expand) {
			builder.push(`$expand=${String(this._params.$expand)}`);
		}

		return builder.join('&');
	}

	public execute(): void {
		this._isExecuting$.next(true);
		this._request$.pipe(
			switchMap(() => this.requestConstructor(this)),
			take(1),
			finalize(() => this._isExecuting$.next(false))
		).subscribe(res => {
			this._response$.next(res);
		});

		this._request$.next({});
	}

	private buildFilter($filter: ODataFilter<TEntity>) {
		const filterParts: string[] = [];

		for (const expression in $filter) {
			const comparerEntity = $filter[expression as keyof ODataFilter<TEntity>];

			if (comparerEntity === undefined) {
				continue;
			}

			if (Array.isArray(comparerEntity)) {
				const subFilters = comparerEntity
					.map((subFilter) => `(${this.buildFilter(subFilter)})`)
					.join(expression);

				filterParts.push(`(${subFilters})`);
				continue;
			}

			for (const column of Object.keys(comparerEntity)) {
				const value = comparerEntity[column as keyof typeof comparerEntity];

				if (expression === 'contains' || expression === 'startsWith' || expression === 'endsWith') {
					filterParts.push(`${expression}(${column}, '${value}')`);
					continue;
				}

				filterParts.push(`${column} ${expression} ${value}`);
			}
		}

		if (filterParts.length === 0) {
			return '';
		}

		return filterParts.join(' and ');
	}
}

export default ODataQueryCommand;

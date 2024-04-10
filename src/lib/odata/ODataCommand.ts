import { Observable, Subject, Subscription, switchMap } from 'rxjs';

import ICommand from './types/ICommand';
import ODataParams, { ODataFilter } from './types/ODataParams';
import ODataResponse from './types/ODataResponse';
import RequestConstructor from './types/RequestConstructor';

/**
 * Represents an OData command that can be executed to retrieve data.
 * @template T - The type of data returned by the OData command.
 */
class ODataQueryCommand<T> implements ICommand {
	private _params: ODataParams<T> = {};
	private _executeOnChange = false;

	private _request$: Subject<{}> = new Subject();
	private _response$: Subject<ODataResponse<T>> = new Subject();

	private _request$$: Subscription = Subscription.EMPTY;

	constructor(private readonly requestConstructor: RequestConstructor<T>) { }

	/**
	 * Gets the parameters for the OData query.
	 * @returns The OData parameters.
	 */
	public get params(): ODataParams<T> {
		return this._params;
	}

	/**
	 * Sets the parameters for the OData query.
	 * @param newParams - The OData parameters to be set.
	 */
	public set params(newParams: ODataParams<T>) {
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

	public get response$(): Observable<ODataResponse<T>> {
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

		return builder.join('&');
	}

	public execute(): void {
		this.reset();
		this.initialize();
	}

	private buildFilter($filter: ODataFilter<T>) {
		const filterParts: string[] = [];

		for (const expression in $filter) {
			const comparerEntity = $filter[expression as keyof ODataFilter<T>];

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

	private reset() {
		this._request$$.unsubscribe();
	}

	private initialize() {
		this._request$$ = this._request$.pipe(
			switchMap(() => this.requestConstructor(this))
		).subscribe(res => {
			this._response$.next(res);
		});

		this._request$.next({});
	}
}

export default ODataQueryCommand;

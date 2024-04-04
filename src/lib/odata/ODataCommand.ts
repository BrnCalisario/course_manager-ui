import { Observable } from 'rxjs';

import ICommand from './types/ICommand';
import ODataParams from './types/ODataParams';
import ODataResponse from './types/ODataResponse';
import RequestConstructor from './types/RequestConstructor';

type Subscriber<T> = (req: Observable<ODataResponse<T>>) => void;

/**
 * Represents an OData command that can be executed to retrieve data.
 * @template T - The type of data returned by the OData command.
 */
class ODataCommand<T> implements ICommand {
	private requestConstructor: RequestConstructor<T>;
	private request: Observable<ODataResponse<T>>;
	private _params: ODataParams = {};

	constructor(func: RequestConstructor<T>) {
		this.requestConstructor = func;
		this.request = func(this);
	}

	private subscribers: Subscriber<T>[] = [];

	public createSubscription(sub: Subscriber<T>): void {
		sub(this.request);
		this.subscribers.push(sub);
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

		return builder.join('&');
	}

	/**
	 * Sets the parameters for the OData query.
	 * @param newParams - The OData parameters to be set.
	 */
	public setParams(newParams: ODataParams): void {
		this._params = { ...this._params, ...newParams };
	}

	/**
	 * Gets the parameters for the OData query.
	 * @returns The OData parameters.
	 */
	public get params(): ODataParams {
		return this._params;
	}

	/**
	 * Executes the OData query.
	 */
	public execute(): void {
		this.request = this.requestConstructor(this);

		this.subscribers.forEach((sub) => sub(this.request));
	}
}

export default ODataCommand;

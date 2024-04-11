import { Observable } from 'rxjs';

import ODataQueryCommand from '../ODataCommand';
import ODataResponse from './ODataResponse';

/**
 * Represents a function that constructs a request for an OData command.
 * @template T The type of the OData command.
 * @param {ODataQueryCommand<T>} command The OData command to construct the request for.
 * @returns {Observable<ODataListResponse<T>>} An observable that emits the OData response.
 */
type RequestConstructor<T, TResponse extends ODataResponse<T>> = (
	command: ODataQueryCommand<T, TResponse>
) => Observable<TResponse>;

export default RequestConstructor;

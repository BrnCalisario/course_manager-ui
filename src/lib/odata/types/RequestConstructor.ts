/**
 * Represents a function that constructs a request for an OData command.
 * @template T The type of the OData command.
 * @param {ODataCommand<T>} command The OData command to construct the request for.
 * @returns {Observable<ODataResponse<T>>} An observable that emits the OData response.
 */
import { Observable } from 'rxjs';

import ODataCommand from '../ODataCommand';
import ODataResponse from './ODataResponse';

type RequestConstructor<T> = (
	command: ODataCommand<T>
) => Observable<ODataResponse<T>>;

export default RequestConstructor;

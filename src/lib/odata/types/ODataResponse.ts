/**
 * Represents an OData response.
 *
 * @template T - The type of the response value.
 */
type ODataResponse<T> = {
	'@odata.count'?: number;
	value: T[];
};

export default ODataResponse;

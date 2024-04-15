/**
 * Represents the parameters for an OData query.
 */
type ODataParams<T> = {
	/**
	 * Specifies the maximum number of items to return.
	 */
	$top?: number;

	/**
	 * Specifies the number of items to skip before starting to return items.
	 */
	$skip?: number;

	/**
	 * Specifies whether to include the total count of items in the response.
	 */
	$count?: boolean;

	/**
	 * Specifies the filter to apply to the query.
	 */
	$filter?: ODataFilter<T>;

	/**
	 * Specifies the order in which to return items.
	 */
	$orderby?: keyof T;

	/**
	 * Specifies the field that wants to expand.
	 */
	$expand?: string;
};

export type ODataFilter<T> = {
	eq?: Partial<Record<keyof T, string>>;
	ne?: Partial<Record<keyof T, string>>;
	gt?: Partial<Record<keyof T, string>>;
	ge?: Partial<Record<keyof T, string>>;
	lt?: Partial<Record<keyof T, string>>;
	le?: Partial<Record<keyof T, string>>;
	startsWith?: Partial<Record<keyof T, string>>;
	endsWith?: Partial<Record<keyof T, string>>;
	contains?: Partial<Record<keyof T, string>>;
	and?: ODataFilter<T>[];
	or?: ODataFilter<T>[];
	not?: ODataFilter<T>[];
};

export default ODataParams;

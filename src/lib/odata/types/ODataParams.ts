/**
 * Represents the parameters for an OData query.
 */
type ODataParams = {
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
};

export default ODataParams;

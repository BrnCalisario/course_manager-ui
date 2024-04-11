type ODataResponse<T> = ODataListResponse<T> | ODataSingleResponse<T>;

type ODataListResponse<T> = {
	'@odata.context': string;
	'@odata.count'?: number;
	value: T[];
};

type ODataSingleResponse<T> = T & {
	'@odata.context': string;
};

export default ODataResponse;

export { ODataListResponse, ODataSingleResponse };


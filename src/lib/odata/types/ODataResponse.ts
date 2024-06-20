import BaseEntity from "@domain/base/base.entity";

type ODataResponse<T> = ODataListResponse<T> | ODataSingleResponse<T>;

type ODataListResponse<T> = {
	'@odata.context': string;
	'@odata.count'?: number;
	value: T[];
};

type ODataSingleResponse<T> = T & {
	'@odata.context': string;
};

export function removeODataProperties<T extends BaseEntity<any>>(obj: ODataSingleResponse<T>) {
	return omit(obj, ["@odata.context", "Id"]);
}

export function omit<T, K extends keyof T>(obj: T, omits: K | K[]): Partial<T> {

	const _omits = Array.isArray(omits) ? omits : [omits];

	for (let i = 0; i < _omits.length; i++) {
		delete obj[_omits[i]];
	}

	return obj;
}

export default ODataResponse;

export { ODataListResponse, ODataSingleResponse };


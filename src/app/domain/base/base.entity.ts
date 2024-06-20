interface BaseEntity<TKey> {
	Id: TKey;
	Deleted: boolean;
}

export default BaseEntity;

export type ContextMenuData = {
	label: string;
	icon?: string;
}

export type MenuItemEvent<T> = {
	type: string,
	item: T
}

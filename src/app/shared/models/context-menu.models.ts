export type ContextMenuData<T> = {
	label: string;
	icon?: string;
	func: (event: MenuItemEvent<T>) => void;
}

export type MenuItemEvent<T> = {
	item: T
}

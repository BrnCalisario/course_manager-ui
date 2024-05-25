import { isPlatformBrowser } from "@angular/common";
import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { TokenInfo } from "@domain/auth/auth.models";

export type StorageItem<T> = T & { Identificator: number };

@Injectable({ providedIn: 'root' })
export default class StorageService {

	private storage?: Storage;

	constructor(
		@Inject(PLATFORM_ID) private plataformId: Object
	) {
		this.storage = isPlatformBrowser(this.plataformId) ? localStorage : undefined;
	}

	public getItem(key: string): string | null {
		return this.storage?.getItem(key) ?? null;
	}

	public setItem(key: string, value: string): void {
		this.storage?.setItem(key, value);
	}

	public removeitem(key: string): void {
		this.storage?.removeItem(key);
	}

	public getList<T = any>(key: string): StorageItem<T>[] {
		const item = this.getItem(key);
		return item ? JSON.parse(item) as StorageItem<T>[] : [];
	}

	public setList<T = any>(key: string, value: T[]): void {
		let newValue = value.map(obj => obj as StorageItem<T>);
		this.setItem(key, JSON.stringify(newValue));
	}

	public appendList<T = any>(key: string, value: T): void {
		const list = this.getList<T>(key);

		const convertedItem = value as StorageItem<T>;
		convertedItem.Identificator = list.length;

		list.push(convertedItem);

		this.setList(key, list);
	}

	public setToken(token: TokenInfo): void {
		this.setItem('token', token.token);
		this.setItem('expiresAt', token.expiresAt.toLocaleString());
	}

	public clearToken(): void {
		this.removeitem('token');
		this.removeitem('expiresAt');
	}
}

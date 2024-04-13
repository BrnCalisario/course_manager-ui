import { isPlatformBrowser } from "@angular/common";
import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { TokenInfo } from "@domain/auth/auth.models";

@Injectable({ providedIn: 'root' })
export default class StorageService {

	private storage?: Storage;

	constructor(
		@Inject(PLATFORM_ID) private plataformId: Object
	) {
		this.storage = isPlatformBrowser(this.plataformId) ? sessionStorage : undefined;
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

	public setToken(token: TokenInfo): void {
		this.setItem('token', token.token);
		this.setItem('expiresAt', token.expiresAt.toLocaleString());
	}

	public clearToken(): void {
		this.removeitem('token');
		this.removeitem('expiresAt');
	}
}

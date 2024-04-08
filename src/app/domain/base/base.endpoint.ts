import { Observable } from 'rxjs';
import ODataResponse from 'src/lib/odata/types/ODataResponse';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment/environment.prod';

export interface BaseEntity<TId> {
	Id: TId;
}

@Injectable()
export abstract class BaseEndpoint<TEntity extends BaseEntity<TId>, TId> {
	abstract get route(): string;

	protected appURL: string = environment.APP_URL;

	protected get baseURL(): string {
		return `${this.appURL}${this.route}`;
	}

	public get headers() {
		const token: string = sessionStorage.getItem('token') ?? '';

		return new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`
		})
	}

	constructor(protected http: HttpClient) {
	}

	public get(id: TId): Observable<ODataResponse<TEntity>> {
		return this.http.get<ODataResponse<TEntity>>(`${this.baseURL}/${id}`, { ...this.headers });
	}

	public getAll(query?: string): Observable<ODataResponse<TEntity>> {
		return this.http.get<ODataResponse<TEntity>>(`${this.baseURL}?${query}`, { ...this.headers });
	}

	public create(entity: Omit<TEntity, 'Id'>): Observable<TEntity> {
		return this.http.post<TEntity>(this.baseURL, entity, { ...this.headers });
	}

	public update(entity: Omit<TEntity, 'Id'>): Observable<TEntity> {
		return this.http.put<TEntity>(this.baseURL, entity, { ...this.headers });
	}

	public delete(id: TId): Observable<TEntity> {
		return this.http.delete<TEntity>(`${this.baseURL}/${id}`, { ...this.headers });
	}
}

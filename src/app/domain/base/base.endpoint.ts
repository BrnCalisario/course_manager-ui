import { Observable } from 'rxjs';
import { environment } from 'src/app/app.config';
import { ODataListResponse, ODataSingleResponse } from 'src/lib/odata/types/ODataResponse';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import BaseEntity from './base.entity';

@Injectable()
export abstract class BaseEndpoint<TKey, TEntity extends BaseEntity<TKey>> {
	abstract get route(): string;

	protected appURL: string = environment.APP_URL;

	protected get baseURL(): string {
		return `${this.appURL}${this.route}`;
	}

	constructor(protected http: HttpClient) {
	}

	public get(id: TKey): Observable<ODataSingleResponse<TEntity>> {
		return this.http.get<ODataSingleResponse<TEntity>>(`${this.baseURL}/${id}`);
	}

	public getAll(query?: string): Observable<ODataListResponse<TEntity>> {
		return this.http.get<ODataListResponse<TEntity>>(`${this.baseURL}?${query}`);
	}

	public create(entity: Omit<TEntity, 'Id'>): Observable<ODataSingleResponse<TEntity>> {
		return this.http.post<ODataSingleResponse<TEntity>>(this.baseURL, entity);
	}

	public update(entity: Omit<TEntity, 'Id'>): Observable<ODataSingleResponse<TEntity>> {
		return this.http.patch<ODataSingleResponse<TEntity>>(this.baseURL, entity);
	}

	public delete(id: TKey): Observable<ODataSingleResponse<TEntity>> {
		return this.http.delete<ODataSingleResponse<TEntity>>(`${this.baseURL}/${id}`);
	}
}

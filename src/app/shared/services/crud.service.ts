import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { BaseResponse } from '../../core/interfaces/base.interface';

@Injectable({
  providedIn: 'root',
})
export abstract class CRUDService<TResponse> {
  /**
   *
   */
  private url: string;

  /**
   *
   * @param http
   */
  constructor(private _base: BaseService, url: string) {
    this.url = url;
  }

  /**
   *
   * @returns
   */
  getAll() {
    return this._base.get<BaseResponse<TResponse[]>>(this.url);
  }

  /**
   *
   * @param id
   */
  getById(id: string) {
    return this._base.get<BaseResponse<TResponse[]>>(`${this.url}/${id}`);
  }

  /**
   *
   * @param page pageSize
   */
  getByPagination(page: number, pageSize: number) {
    return this._base.get<BaseResponse<TResponse[]>>(
      `${this.url}/pagination?page=${page}&pageSize=${pageSize}`
    );
  }
}

import { Observable } from 'rxjs';
import { CRUDService } from '../services/crud.service';
import { BaseResponse } from '../../core/interfaces/base.interface';

export abstract class Grid<TResponse> {
  /**
   *
   */
  data$!: Observable<BaseResponse<TResponse[]>>;

  /**
   *
   */
  constructor(protected $data: CRUDService<TResponse>) {
    this.getAll();
  }

  /**
   *
   */
  getAll() {
    this.data$ = this.$data.getAll();
  }

  /**
   *
   */
  getByPagination(page: number, pageSize: number) {
    this.data$ = this.$data.getByPagination(page, pageSize);
  }
}

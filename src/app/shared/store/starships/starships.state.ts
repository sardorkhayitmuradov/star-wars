import { Action, State, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { StarshipsModel } from '../../../core/interfaces/starships.interface';
import { BaseResponse } from '../../../core/interfaces/base.interface';
import { StarshipsAction } from './starships.action';
import { StarshipsService } from '../../../modules/starships/service/starships.service';

@State<BaseResponse<StarshipsModel[]>>({
  name: 'starships',
  defaults: {
    count: 0,
    next: '',
    previous: '',
    results: [],
  },
})
@Injectable()
export class StarshipsState {
  constructor(private $starships: StarshipsService) {}
  /**
   *
   * @param state
   * @returns
   */
  @Selector()
  static starships(state: BaseResponse<StarshipsModel[]>) {
    return state;
  }

  /**
   *
   * @param ctx
   */
  @Action(StarshipsAction)
  setStarships(
    ctx: StateContext<BaseResponse<StarshipsModel[]>>,
    action: StarshipsAction
  ) {
    return this.$starships.getByPagination(action.pageIndex).pipe(
      tap((starships) => {
        const state = ctx.getState();
        ctx.setState({ ...state, ...starships });
      })
    );
  }
}

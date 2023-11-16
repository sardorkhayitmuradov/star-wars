import { Action, State, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { BaseResponse } from '../../../core/interfaces/base.interface';
import { PlanetsAction } from './planets.action';
import { PlanetsModel } from '../../../core/interfaces/planets.interface';
import { PlanetsService } from '../../../modules/planets/service/planets.service';

@State<BaseResponse<PlanetsModel[]>>({
  name: 'planets',
  defaults: {
    count: 0,
    next: '',
    previous: '',
    results: [],
  },
})
@Injectable()
export class PlanetsState {
  constructor(private $planets: PlanetsService) {}
  /**
   *
   * @param state
   * @returns
   */
  @Selector()
  static planets(state: BaseResponse<PlanetsModel[]>) {
    return state;
  }

  /**
   *
   * @param ctx
   */
  @Action(PlanetsAction)
  setFilms(
    ctx: StateContext<BaseResponse<PlanetsModel[]>>,
    action: PlanetsAction
  ) {
    return this.$planets.getByPagination(action.pageIndex).pipe(
      tap((planets) => {
        const state = ctx.getState();
        ctx.setState({ ...state, ...planets });
      })
    );
  }
}

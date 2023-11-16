import { Action, State, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { FilmsAction } from './films.action';
import { FilmsModel } from '../../../core/interfaces/films.interface';
import { BaseResponse } from '../../../core/interfaces/base.interface';
import { FilmsService } from '../../../modules/films/service/films.service';
import { tap } from 'rxjs';

@State<BaseResponse<FilmsModel[]>>({
  name: 'films',
  defaults: {
    count: 0,
    next: '',
    previous: '',
    results: [],
  },
})
@Injectable()
export class FilmsState {
  constructor(private $films: FilmsService) {}
  /**
   *
   * @param state
   * @returns
   */
  @Selector()
  static films(state: BaseResponse<FilmsModel[]>) {
    return state;
  }

  /**
   *
   * @param ctx
   */
  @Action(FilmsAction)
  setFilms(ctx: StateContext<BaseResponse<FilmsModel[]>>, action: FilmsAction) {
    return this.$films.getAll().pipe(
      tap((films) => {
        const state = ctx.getState();
        ctx.setState({ ...state, ...films });
      })
    );
  }
}

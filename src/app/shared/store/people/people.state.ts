import { Action, State, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { PeopleAction } from './people.action';
import { tap } from 'rxjs';
import { BaseResponse } from '../../../core/interfaces/base.interface';
import { PeopleModel } from '../../../core/interfaces/people.interface';
import { PeopleService } from '../../../modules/people/service/people.service';

@State<BaseResponse<PeopleModel[]>>({
  name: 'people',
  defaults: {
    count: 0,
    next: '',
    previous: '',
    results: [],
  },
})
@Injectable()
export class PeopleState {
  constructor(private $people: PeopleService) {}
  /**
   *
   * @param state
   * @returns
   */
  @Selector()
  static people(state: BaseResponse<PeopleModel[]>) {
    return state;
  }

  /**
   *
   * @param ctx
   */
  @Action(PeopleAction)
  setPeople(
    ctx: StateContext<BaseResponse<PeopleModel[]>>,
    action: PeopleAction
  ) {
    return this.$people.getByPagination(action.pageIndex).pipe(
      tap((people) => {
        const state = ctx.getState();
        ctx.setState({ ...state, ...people });
      })
    );
  }
}

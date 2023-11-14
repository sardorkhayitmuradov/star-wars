import { Action, State, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { PeopleAction } from './people.action';
import { tap } from 'rxjs';
import { BaseResponse } from '../../../core/interfaces/base.interface';
import { FilmsService } from '../../../modules/films/service/films.service';
import { PeopleModel } from '../../../core/interfaces/people.interface';
import { PeopleService } from '../../../modules/people/service/people.service';

@State<BaseResponse<PeopleModel[]>>({
  name: 'people',
  defaults: {
    results: [],
  },
})
@Injectable()
export class FilmsState {
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
    return this.$people.getAll().pipe(
      tap((people) => {
        const state = ctx.getState();
        ctx.setState({ ...state, ...people });
      })
    );
  }
}

import { Action, State, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { SpecieseAction } from './species.action';
import { SpeciesModel } from '../../../core/interfaces/speicies.interface';
import { BaseResponse } from '../../../core/interfaces/base.interface';
import { SpeciesService } from '../../../modules/species/service/species.service';

@State<BaseResponse<SpeciesModel[]>>({
  name: 'species',
  defaults: {
    results: [],
  },
})
@Injectable()
export class SpeciesState {
  constructor(private $species: SpeciesService) {}
  /**
   *
   * @param state
   * @returns
   */
  @Selector()
  static species(state: BaseResponse<SpeciesModel[]>) {
    return state;
  }

  /**
   *
   * @param ctx
   */
  @Action(SpecieseAction)
  setSpecies(
    ctx: StateContext<BaseResponse<SpeciesModel[]>>,
    action: SpecieseAction
  ) {
    return this.$species.getAll().pipe(
      tap((species) => {
        const state = ctx.getState();
        ctx.setState({ ...state, ...species });
      })
    );
  }
}

import { Action, State, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { VehiclesAction } from './vehicles.action';
import { VehiclesModel } from '../../../core/interfaces/vehicles.interface';
import { BaseResponse } from '../../../core/interfaces/base.interface';
import { tap } from 'rxjs';
import { VehiclesService } from '../../../modules/vehicles/service/vehicles.service';

@State<BaseResponse<VehiclesModel[]>>({
  name: 'vehicles',
  defaults: {
    results: [],
  },
})
@Injectable()
export class VehiclesState {
  constructor(private $vehicles: VehiclesService) {}
  /**
   *
   * @param state
   * @returns
   */
  @Selector()
  static vehicles(state: BaseResponse<VehiclesModel[]>) {
    return state;
  }

  /**
   *
   * @param ctx
   */
  @Action(VehiclesAction)
  setVehicles(
    ctx: StateContext<BaseResponse<VehiclesModel[]>>,
    action: VehiclesAction
  ) {
    return this.$vehicles.getAll().pipe(
      tap((vehicles) => {
        const state = ctx.getState();
        ctx.setState({ ...state, ...vehicles });
      })
    );
  }
}

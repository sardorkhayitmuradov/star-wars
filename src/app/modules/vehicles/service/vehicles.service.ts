import { Injectable } from '@angular/core';
import { CRUDService } from '../../../shared/services/crud.service';
import { VehiclesModel } from '../../../core/interfaces/vehicles.interface';
import { BaseService } from '../../../shared/services/base.service';
import { HttpPaths } from '../../../core/enums/http-paths';

@Injectable({
  providedIn: 'root',
})
export class VehiclesService extends CRUDService<VehiclesModel> {
  /**
   *
   * @param $base
   */
  constructor(private $base: BaseService) {
    super($base, HttpPaths.Vehicles);
  }
}

import { Injectable } from '@angular/core';
import { PlanetsModel } from '../../../core/interfaces/planets.interface';
import { CRUDService } from '../../../shared/services/crud.service';
import { BaseService } from '../../../shared/services/base.service';
import { HttpPaths } from '../../../core/enums/http-paths';

@Injectable({
  providedIn: 'root',
})
export class PlanetsService extends CRUDService<PlanetsModel> {
  /**
   *
   * @param $base
   */
  constructor(private $base: BaseService) {
    super($base, HttpPaths.Planets);
  }
}

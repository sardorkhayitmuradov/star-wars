import { Injectable } from '@angular/core';
import { BaseService } from '../../../shared/services/base.service';
import { HttpPaths } from '../../../core/enums/http-paths';
import { CRUDService } from '../../../shared/services/crud.service';
import { SpeciesModel } from '../../../core/interfaces/speicies.interface';

@Injectable({
  providedIn: 'root',
})
export class SpeciesService extends CRUDService<SpeciesModel> {
  /**
   *
   * @param $base
   */
  constructor(private $base: BaseService) {
    super($base, HttpPaths.Species);
  }
}

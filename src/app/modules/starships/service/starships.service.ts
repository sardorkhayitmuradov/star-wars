import { Injectable } from '@angular/core';
import { BaseService } from '../../../shared/services/base.service';
import { HttpPaths } from '../../../core/enums/http-paths';
import { CRUDService } from '../../../shared/services/crud.service';
import { StarshipsModel } from '../../../core/interfaces/starships.interface';

@Injectable({
  providedIn: 'root',
})
export class StarshipsService extends CRUDService<StarshipsModel> {
  /**
   *
   * @param $base
   */
  constructor(private $base: BaseService) {
    super($base, HttpPaths.Starships);
  }
}

import { Injectable } from '@angular/core';
import { BaseService } from '../../../shared/services/base.service';
import { HttpPaths } from '../../../core/enums/http-paths';
import { PeopleModel } from '../../../core/interfaces/people.interface';
import { CRUDService } from '../../../shared/services/crud.service';

@Injectable({
  providedIn: 'root',
})
export class PeopleService extends CRUDService<PeopleModel> {
  /**
   *
   * @param $base
   */
  constructor(private $base: BaseService) {
    super($base, HttpPaths.People);
  }
}

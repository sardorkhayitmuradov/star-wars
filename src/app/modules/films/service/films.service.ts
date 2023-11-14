import { Injectable } from '@angular/core';
import { CRUDService } from '../../../shared/services/crud.service';
import { BaseService } from '../../../shared/services/base.service';
import { HttpPaths } from '../../../core/enums/http-paths';
import { FilmsModel } from '../../../core/interfaces/films.interface';

@Injectable({
  providedIn: 'root'
})
export class FilmsService extends CRUDService<FilmsModel> {
  /**
   *
   * @param $base
   */
  constructor(private $base: BaseService) {
    super($base, HttpPaths.Films);
  }

}

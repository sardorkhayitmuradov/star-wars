import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { PlanetsState } from '../../shared/store/planets/planets.state';
import { BaseResponse } from '../../core/interfaces/base.interface';
import { PlanetsModel } from '../../core/interfaces/planets.interface';
import { Select, Store } from '@ngxs/store';
import { DestroyService } from '../../core/services/destroy.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PlanetsAction } from '../../shared/store/planets/planets.action';

@Component({
  selector: 'app-planets',
  templateUrl: './planets.component.html',
  styleUrls: ['./planets.component.scss'],
  providers: [DestroyService],
})
export class PlanetsComponent {
  @Select(PlanetsState.planets) data$!: Observable<
    BaseResponse<PlanetsModel[]>
  >;

  constructor(
    $store: Store,
    private destroyer: DestroyService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    $store.dispatch(new PlanetsAction());
  }
}

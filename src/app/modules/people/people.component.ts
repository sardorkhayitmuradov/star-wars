import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { BaseResponse } from '../../core/interfaces/base.interface';
import { PeopleModel } from '../../core/interfaces/people.interface';
import { PeopleState } from '../../shared/store/people/people.state';
import { DestroyService } from '../../core/services/destroy.service';
import { PeopleAction } from '../../shared/store/people/people.action';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss'],
  providers: [DestroyService],
})
export class PeopleComponent {
  @Select(PeopleState.people) data$!: Observable<BaseResponse<PeopleModel[]>>;

  constructor(
    $store: Store,
    private destroyer: DestroyService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    $store.dispatch(new PeopleAction())
  }
}

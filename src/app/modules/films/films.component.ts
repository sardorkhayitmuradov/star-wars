import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DestroyService } from '../../core/services/destroy.service';
import { Select, Store } from '@ngxs/store';
import { FilmsAction } from '../../shared/store/films/films.action';
import { FilmsModel } from '../../core/interfaces/films.interface';
import { BaseResponse } from '../../core/interfaces/base.interface';
import { Observable } from 'rxjs';
import { FilmsState } from '../../shared/store/films/films.state';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.scss'],
  providers: [DestroyService, NgxSpinnerService],
})
export class FilmsComponent {
  @Select(FilmsState.films) data$!: Observable<BaseResponse<FilmsModel[]>>;

  constructor(
    $store: Store,
    private destroyer: DestroyService,
    private router: Router,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) {
    $store.dispatch(new FilmsAction());
    this.loadData();
  }

  loadData() {
    this.data$.subscribe((w) => {
      console.log(w);
      w.results.length > 0 ? this.spinner.hide() : this.spinner.show();
    });
  }
}

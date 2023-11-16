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
import { NgxSpinnerService } from 'ngx-spinner';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-planets',
  templateUrl: './planets.component.html',
  styleUrls: ['./planets.component.scss'],
  providers: [DestroyService, NgxSpinnerService],
})
export class PlanetsComponent {
  @Select(PlanetsState.planets) data$!: Observable<
    BaseResponse<PlanetsModel[]>
  >;
  length = 0;
  pageSize = 10;
  pageIndex = +this.route.snapshot.queryParams['pageIndex'] || 0;
  pageSizeOptions = [5, 10, 25];

  constructor(
    private $store: Store,
    private destroyer: DestroyService,
    private router: Router,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) {
    this.loadData();
  }

  handlePageEvent(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.loadData();
  }

  loadData() {
    this.spinner.show();

    this.$store
      .dispatch(new PlanetsAction(this.pageIndex + 1))
      .subscribe((response) => {
        const hasResults = response.planets.results.length > 0;
        hasResults ? this.spinner.hide() : this.spinner.show();
        this.length = response.planets.count;
      });

    this.router.navigate([], {
      queryParams: { pageIndex: this.pageIndex },
    });
  }
}

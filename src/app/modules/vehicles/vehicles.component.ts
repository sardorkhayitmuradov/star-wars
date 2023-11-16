import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { VehiclesState } from 'src/app/shared/store/vehicles/vehicles.state';
import { Observable } from 'rxjs';
import { BaseResponse } from 'src/app/core/interfaces/base.interface';
import { VehiclesModel } from 'src/app/core/interfaces/vehicles.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { VehiclesAction } from 'src/app/shared/store/vehicles/vehicles.action';
import { DestroyService } from 'src/app/core/services/destroy.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss'],
  providers: [DestroyService, NgxSpinnerService],
})
export class VehiclesComponent {
  @Select(VehiclesState.vehicles) data$!: Observable<
    BaseResponse<VehiclesModel[]>
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
      .dispatch(new VehiclesAction(this.pageIndex + 1))
      .subscribe((response) => {
        const hasResults = response.vehicles.results.length > 0;
        hasResults ? this.spinner.hide() : this.spinner.show();
        this.length = response.vehicles.count;
      });

    this.router.navigate([], {
      queryParams: { pageIndex: this.pageIndex },
    });
  }
}

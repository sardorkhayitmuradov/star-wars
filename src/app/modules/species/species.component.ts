import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { SpecieseAction } from 'src/app/shared/store/species/species.action';
import { DestroyService } from 'src/app/core/services/destroy.service';
import { SpeciesState } from 'src/app/shared/store/species/species.state';
import { SpeciesModel } from 'src/app/core/interfaces/speicies.interface';
import { BaseResponse } from 'src/app/core/interfaces/base.interface';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-species',
  templateUrl: './species.component.html',
  styleUrls: ['./species.component.scss'],
  providers: [DestroyService, NgxSpinnerService],
})
export class SpeciesComponent {
  @Select(SpeciesState.species) data$!: Observable<
    BaseResponse<SpeciesModel[]>
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
      .dispatch(new SpecieseAction(this.pageIndex + 1))
      .subscribe((response) => {
        const hasResults = response.species.results.length > 0;
        hasResults ? this.spinner.hide() : this.spinner.show();
        this.length = response.species.count;
      });

    this.router.navigate([], {
      queryParams: { pageIndex: this.pageIndex },
    });
  }
}

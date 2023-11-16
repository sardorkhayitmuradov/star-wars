import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseResponse } from 'src/app/core/interfaces/base.interface';
import { StarshipsModel } from 'src/app/core/interfaces/starships.interface';
import { DestroyService } from 'src/app/core/services/destroy.service';
import { StarshipsState } from 'src/app/shared/store/starships/starships.state';
import { StarshipsAction } from 'src/app/shared/store/starships/starships.action';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-starships',
  templateUrl: './starships.component.html',
  styleUrls: ['./starships.component.scss'],
  providers: [DestroyService, NgxSpinnerService],
})
export class StarshipsComponent {
  @Select(StarshipsState.starships) data$!: Observable<
    BaseResponse<StarshipsModel[]>
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
      .dispatch(new StarshipsAction(this.pageIndex + 1))
      .subscribe((response) => {
        const hasResults = response.starships.results.length > 0;
        hasResults ? this.spinner.hide() : this.spinner.show();
        this.length = response.starships.count;
      });

    this.router.navigate([], {
      queryParams: { pageIndex: this.pageIndex },
    });
  }
}

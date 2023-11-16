import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { BaseResponse } from '../../core/interfaces/base.interface';
import { PeopleModel } from '../../core/interfaces/people.interface';
import { PeopleState } from '../../shared/store/people/people.state';
import { DestroyService } from '../../core/services/destroy.service';
import { PeopleAction } from '../../shared/store/people/people.action';
import { NgxSpinnerService } from 'ngx-spinner';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss'],
  providers: [DestroyService, NgxSpinnerService],
})
export class PeopleComponent {
  @Select(PeopleState.people) data$!: Observable<BaseResponse<PeopleModel[]>>;
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
      .dispatch(new PeopleAction(this.pageIndex + 1))
      .subscribe((response) => {
        const hasResults = response.people.results.length > 0;
        hasResults ? this.spinner.hide() : this.spinner.show();
        this.length = response.people.count;
      });

    this.router.navigate([], {
      queryParams: { pageIndex: this.pageIndex },
    });
  }
}

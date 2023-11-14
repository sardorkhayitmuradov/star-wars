import { Component, OnInit } from '@angular/core';
import { FilmsService } from './service/films.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DestroyService } from '../../core/services/destroy.service';
import { Store } from '@ngxs/store';
import { FilmsAction } from '../../shared/store/films/films.action';
import { Grid } from '../../shared/crud/grid.class';
import { FilmsModel } from '../../core/interfaces/films.interface';
import { BaseResponse } from '../../core/interfaces/base.interface';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.scss'],
  providers: [DestroyService],
})
export class FilmsComponent implements OnInit {
  data!: BaseResponse<FilmsModel[]>;
  //Loader spinner
  // isLoading = false;

  // load() : void {
  //   this.isLoading = true;
  //   setTimeout( () => this.isLoading = false, 2000 );
  // }

  // async wait(ms: number): Promise<void> {
  // 	return new Promise<void>( resolve => setTimeout( resolve, ms) );
  // }

  // start() {
  //   this.isLoading = true;
  // 	this.wait(2000).then( () => this.isLoading = false );
  // }

  constructor(
    private $store: Store,
    private destroyer: DestroyService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    $store.dispatch(new FilmsAction());
  }

  /**
   *
   */
  ngOnInit(): void {
    this.$store
      .select((select) => {
        this.data = select.films;
      })
      .pipe(takeUntil(this.destroyer))
      .subscribe();
  }
}

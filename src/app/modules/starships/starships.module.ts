import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StarshipsRoutingModule } from './starships-routing.module';
import { StarshipsComponent } from './starships.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [StarshipsComponent],
  imports: [
    CommonModule,
    StarshipsRoutingModule,
    NgxSpinnerModule,
    MatPaginatorModule,
  ],
})
export class StarshipsModule {}

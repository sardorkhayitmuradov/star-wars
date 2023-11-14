import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsModule } from '@ngxs/store';
import { HttpClientModule } from '@angular/common/http';
import { ENDPOINT } from './shared/services/base.service';
import { environment } from './environments/environment';
import { FilmsState } from './shared/store/films/films.state';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxsModule.forRoot([FilmsState], {
      // developmentMode: !environment.production
    }),
  ],
  providers: [{ provide: ENDPOINT, useValue: environment.endpoint }],
  bootstrap: [AppComponent],
})
export class AppModule {}

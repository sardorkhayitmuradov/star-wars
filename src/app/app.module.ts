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
import { PeopleState } from './shared/store/people/people.state';
import { PlanetsState } from './shared/store/planets/planets.state';
import { SpeciesState } from './shared/store/species/species.state';
import { StarshipsState } from './shared/store/starships/starships.state';
import { VehiclesState } from './shared/store/vehicles/vehicles.state';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxsModule.forRoot(
      [
        FilmsState,
        PeopleState,
        PlanetsState,
        SpeciesState,
        StarshipsState,
        VehiclesState,
      ],
      {}
    ),
  ],
  providers: [{ provide: ENDPOINT, useValue: environment.endpoint }],
  bootstrap: [AppComponent],
})
export class AppModule {}

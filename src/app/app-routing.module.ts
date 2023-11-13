import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  {
    path: 'films',
    loadChildren: () =>
      import('./modules/films/films.module').then((m) => m.FilmsModule),
  },
  {
    path: 'people',
    loadChildren: () =>
      import('./modules/people/people.module').then((m) => m.PeopleModule),
  },
  {
    path: 'planets',
    loadChildren: () =>
      import('./modules/planets/planets.module').then((m) => m.PlanetsModule),
  },
  {
    path: 'species',
    loadChildren: () =>
      import('./modules/species/species.module').then((m) => m.SpeciesModule),
  },
  {
    path: 'starships',
    loadChildren: () =>
      import('./modules/starships/starships.module').then(
        (m) => m.StarshipsModule
      ),
  },
  {
    path: 'vehicles',
    loadChildren: () =>
      import('./modules/vehicles/vehicles.module').then(
        (m) => m.VehiclesModule
      ),
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

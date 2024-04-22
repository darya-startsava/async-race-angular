import { Routes } from '@angular/router';

import { GarageComponent } from './garage/garage.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { WinnersComponent } from './winners/winners.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'garage/1' },
  { path: 'garage', pathMatch: 'full', redirectTo: 'garage/1' },
  { path: 'garage/:page', component: GarageComponent },
  { path: 'winners', component: WinnersComponent },
  { path: '**', component: PageNotFoundComponent }
];

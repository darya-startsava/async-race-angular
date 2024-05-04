import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  Routes
} from '@angular/router';

import { GarageComponent } from './garage/garage.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { WinnersComponent } from './winners/winners.component';

const canActivatePage: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const page = route.paramMap.get('page');
  if (!Number.isInteger(+page)) {
    return inject(Router).parseUrl('');
  }
  return true;
};

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'garage/1' },
  { path: 'garage', pathMatch: 'full', redirectTo: 'garage/1' },
  {
    path: 'garage/:page',
    component: GarageComponent,
    canActivate: [canActivatePage]
  },
  { path: 'winners', pathMatch: 'full', redirectTo: 'winners/1' },
  {
    path: 'winners/:page',
    component: WinnersComponent,
    canActivate: [canActivatePage]
  },
  { path: '**', component: PageNotFoundComponent }
];

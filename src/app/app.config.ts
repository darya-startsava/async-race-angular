import { HttpClientModule } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState, provideStore } from '@ngrx/store';

import { routes } from './app.routes';
import { CarsEffects } from './redux/effects/cars.effects';
import { PaginationEffects } from './redux/effects/pagination.effects';
import { CarsReducer } from './redux/reducers/cars.reducer';
import { PaginationReducer } from './redux/reducers/pagination.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    importProvidersFrom(HttpClientModule),
    provideStore(),
    provideState({ name: 'cars', reducer: CarsReducer }),
    provideState({ name: 'pagination', reducer: PaginationReducer }),
    provideEffects(CarsEffects, PaginationEffects)
  ]
};

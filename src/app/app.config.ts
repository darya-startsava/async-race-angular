import { HttpClientModule } from '@angular/common/http';
import {
  ApplicationConfig,
  importProvidersFrom,
  isDevMode
} from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { routes } from './app.routes';
import { CarsEffects } from './redux/effects/cars.effects';
import { EngineEffects } from './redux/effects/engine.effects';
import { PaginationEffects } from './redux/effects/pagination.effects';
import { WinnersEffects } from './redux/effects/winners.effects';
import { CarsReducer } from './redux/reducers/cars.reducer';
import { PaginationReducer } from './redux/reducers/pagination.reducer';
import { WinnersReducer } from './redux/reducers/winners.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    importProvidersFrom(HttpClientModule),
    provideStore(),
    provideState({ name: 'cars', reducer: CarsReducer }),
    provideState({ name: 'pagination', reducer: PaginationReducer }),
    provideState({ name: 'winners', reducer: WinnersReducer }),
    provideEffects(
      CarsEffects,
      PaginationEffects,
      EngineEffects,
      WinnersEffects
    ),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })
  ]
};

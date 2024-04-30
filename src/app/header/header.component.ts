import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import {
  selectPaginationFeatureGarageCurrentPage,
  selectPaginationFeatureWinnersCurrentPage
} from '../redux/selectors/pagination.selectors';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, MatButtonModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  public currentGaragePage$: Observable<number> = this.store.select(
    selectPaginationFeatureGarageCurrentPage
  );
  public currentWinnersPage$: Observable<number> = this.store.select(
    selectPaginationFeatureWinnersCurrentPage
  );
  constructor(private store: Store) {}
}

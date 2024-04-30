import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CARS_PER_PAGE_WINNERS, URL } from './constants';
import { SortBy, SortOrder } from './redux/state.models';
import { Winner } from './winners/models/winners.models';

@Injectable({
  providedIn: 'root'
})
export class WinnersService {
  private readonly winnersUrl = `${URL}/winners`;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(private http: HttpClient) {}

  getWinners(
    page: number,
    sortBy: SortBy,
    sortOrder: SortOrder
  ): Observable<HttpResponse<Winner[]>> {
    return this.http.get<Winner[]>(
      `${this.winnersUrl}?_page=${page}&_limit=${CARS_PER_PAGE_WINNERS}&_sort=${sortBy}&_order=${sortOrder}`,
      {
        observe: 'response'
      }
    );
  }

  createWinner(winnerRequest: Winner): Observable<Winner> {
    return this.http.post<Winner>(
      this.winnersUrl,
      winnerRequest,
      this.httpOptions
    );
  }

  getWinner(id: number): Observable<Winner> {
    return this.http.get<Winner>(`${this.winnersUrl}/${id}`);
  }

  updateWinner(winnerRequest: Winner): Observable<Winner> {
    return this.http.put<Winner>(
      `${this.winnersUrl}/${winnerRequest.id}`,
      { wins: winnerRequest.wins, time: winnerRequest.time },
      this.httpOptions
    );
  }

  deleteWinner(id: number) {
    return this.http.delete(`${this.winnersUrl}/${id}`);
  }
}

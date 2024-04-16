import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { URL } from './constants';
import { WinnersResponse } from './winners/models/winners.models';

@Injectable({
  providedIn: 'root'
})
export class WinnersService {
  private readonly winnersUrl = `${URL}/winners`;
  constructor(private http: HttpClient) {}

  getWinners(): Observable<WinnersResponse[]> {
    return this.http.get<WinnersResponse[]>(this.winnersUrl);
  }
}

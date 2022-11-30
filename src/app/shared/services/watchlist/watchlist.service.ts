import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WatchlistService {
  constructor(private http: HttpClient) {}

  newWatchlist(userId: string): Observable<any> {
    const url = environment.apiUrl + '/user/' + userId + '/watchlist';
    return this.http.post(url, { responseType: 'text' });
  }

  getWatchlist(): Observable<any> {
    const token = localStorage.getItem('token');
    const id = localStorage.getItem('id');
    const url = environment.apiUrl + '/user/' + id + '/watchlist';
    return this.http.get(url, {
      headers: { authorization: 'Bearer ' + token },
      responseType: 'json',
    });
  }

  updateItem(movie_id: number, flag: string): Observable<any> {
    const token = localStorage.getItem('token');
    const id = localStorage.getItem('id');
    const url = environment.apiUrl + '/user/' + id + '/watchlist/' + movie_id;
    return this.http.put(
      url,
      { flag },
      {
        headers: { authorization: 'Bearer ' + token },
        responseType: 'text',
      }
    );
  }

  deleteWatchlist(): Observable<any> {
    const token = localStorage.getItem('token');
    const id = localStorage.getItem('id');

    const url = `${environment.apiUrl}/user/${id}/watchlist`;
    return this.http.delete(url, {
      headers: { authorization: 'Bearer ' + token },
      responseType: 'text',
    });
  }
}

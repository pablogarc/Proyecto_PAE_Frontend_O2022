import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  constructor(private http: HttpClient) {}

  getReviews(movieId: number): Observable<any> {
    const url = `${environment.apiUrl}/movie/${movieId}/reviews`;
    return this.http.get(url);
  }

  createReview(
    movieId: number,
    user_id: string,
    content: string
  ): Observable<any> {
    const token = localStorage.getItem('token');
    const url = `${environment.apiUrl}/movie/${movieId}/reviews/${user_id}`;
    return this.http.post(
      url,
      { content },
      {
        headers: { authorization: 'Bearer ' + token },
        responseType: 'text',
      }
    );
  }

  newContentReview(
    reviewId: any,
    movieId: number,
    content: string
  ): Observable<any> {
    const token = localStorage.getItem('token');
    const url = `${environment.apiUrl}/movie/${movieId}/reviews/${reviewId}`;
    return this.http.put(
      url,
      { content },
      {
        headers: { authorization: 'Bearer ' + token },
        responseType: 'text',
      }
    );
  }

  deleteReviews(): Observable<any> {
    const id = localStorage.getItem('id');
    const token = localStorage.getItem('token');
    const movieId = 'something';
    const url = `${environment.apiUrl}/movie/${movieId}/reviews/${id}`;
    return this.http.delete(url, {
      headers: { authorization: 'Bearer ' + token },
      responseType: 'text',
    });
  }
}

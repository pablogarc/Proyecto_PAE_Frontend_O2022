import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../../interfaces/movie';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private movie: Movie = {
    id: 0,
    title: '',
    overview: '',
    vote_average: 0,
    release_date: '',
    adult: false,
    original_language: '',
  };

  constructor(private http: HttpClient) {}

  getMovies(): Observable<any> {
    const url = `${environment.apiUrl}/movies`;
    return this.http.get(url);
  }

  getMovieById(movieId: number): Observable<any> {
    const url = `${environment.apiUrl}/movie/${movieId}`;
    return this.http.get(url);
  }

  getMovieByTitle(title: string): Observable<any> {
    let params = new HttpParams();
    params = params.append('title', title);
    const url = `${environment.apiUrl}/movie`;
    return this.http.get(url, {
      params: params,
    });
  }

  setCurrentMovie(movie: Movie) {
    this.movie = movie;
    localStorage.setItem('movie', JSON.stringify(movie));
  }

  getCurrentNoticia(): Movie {
    if (!this.movie.title) {
      const movie = localStorage.getItem('movie') || '{}';
      this.movie = JSON.parse(movie);
    }
    return this.movie;
  }
}

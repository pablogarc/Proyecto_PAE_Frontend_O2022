import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/shared/services/movies/movie.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  movies: any = [];
  mybreakpoint: number = 0;

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.allMovies();
    this.mybreakpoint = (window.innerWidth <= 600) ? 1 : 6;
  }

  allMovies() {
    this.movieService.getMovies().subscribe({
      next: (response) => {
        this.movies = response;
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

}

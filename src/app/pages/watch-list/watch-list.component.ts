import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovieService } from 'src/app/shared/services/movies/movie.service';
import { WatchlistService } from 'src/app/shared/services/watchlist/watchlist.service';

@Component({
  selector: 'app-watch-list',
  templateUrl: './watch-list.component.html',
  styleUrls: ['./watch-list.component.scss'],
})
export class WatchListComponent implements OnInit {
  watchlistData: any = [];
  moviesArray: any = [];
  watchlistFlag!: boolean;

  url: string = 'https://image.tmdb.org/t/p/w500';

  constructor(
    private watchlistService: WatchlistService,
    private movieService: MovieService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.watchlist();
  }

  watchlist() {
    this.watchlistService.getWatchlist().subscribe({
      next: (response) => {
        if (!response.movies) {
          this.watchlistFlag = false;
          return;
        }
        this.watchlistFlag = true;
        this.moviesArray = response.movies;
        this.getMovie(this.moviesArray);
      },
      error: (err: any) => {
        //console.log(err);
      },
    });
  }

  getMovie(array: any) {
    array.forEach((element) => {
      this.movieService.getMovieById(element).subscribe({
        next: (response) => {
          this.watchlistData.push(response);
        },
        error: (err: any) => {
          //console.log(err);
        },
      });
    });
  }

  removeItem(movieId: number) {
    this.watchlistService.updateItem(movieId, 'remove').subscribe({
      next: (response) => {
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['/watchlist']);
      },
      error: (err: any) => {
        //console.log(err);
      },
    });
  }
}

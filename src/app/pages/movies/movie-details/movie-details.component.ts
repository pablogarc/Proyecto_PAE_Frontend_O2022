import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from 'src/app/shared/services/movies/movie.service';

import { Movie } from 'src/app/shared/interfaces/movie';
import { WatchlistService } from 'src/app/shared/services/watchlist/watchlist.service';
import { UserService } from 'src/app/shared/services/users/user.service';
import { ReviewService } from 'src/app/shared/services/reviews/review.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
})
export class MovieDetailsComponent implements OnInit {
  movie: Movie = {
    id: 0,
    title: '',
    overview: '',
    vote_average: 0,
    release_date: '',
    adult: false,
    original_language: '',
  };

  title: string = '';

  url: string = 'https://image.tmdb.org/t/p/w500';

  watchlist: any = [];
  allReviews: any = [];

  userLogged: boolean;
  isOnWatchlist: boolean;
  reviewFlag: boolean = false;
  updateReviewFlag: boolean = false;
  reviewIdUpdate: any;

  userId!: string;
  newReview: string = '';
  updateReviewContent: string = '';

  constructor(
    private movieService: MovieService,
    private watchlistService: WatchlistService,
    private userService: UserService,
    private reviewService: ReviewService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.title = params['title'];
    });

    this.movie = this.movieService.getCurrentNoticia();

    if (this.title !== this.movie.title) {
      this.router.navigate(['..'], {
        relativeTo: this.activatedRoute,
      });
    }

    if (this.userService.checkUser()) {
      this.userLogged = true;
      this.userId = localStorage.getItem('id');
      this.watchlistService.getWatchlist().subscribe({
        next: (response) => {
          this.watchlist = response;
          if (this.watchlist.movies.includes(this.movie.id))
            this.isOnWatchlist = true;
          else this.isOnWatchlist = false;
        },
        error: (err: any) => {
          console.log(err);
        },
      });
    } else this.userLogged = false;

    this.reviews();
  }

  addItemToWatchlist(movieId: number) {
    this.watchlistService.updateItem(movieId, 'add').subscribe({
      next: (response) => {
        console.log(response);
        this.reloadPage();
      },
      error: (err: any) => {
        //console.log(err);
      },
    });
  }

  changeReviewFlag() {
    this.reviewFlag = true;
  }

  changeUpdateReviewFlag(reviewId: any) {
    this.reviewIdUpdate = reviewId;
    this.updateReviewFlag = true;
  }

  createNewReview() {
    if (!this.newReview || this.newReview.length < 2) return;
    this.reviewService
      .createReview(this.movie.id, this.userId, this.newReview)
      .subscribe({
        next: (response) => {
          this.reloadPage();
        },
        error: (err: any) => {
          //console.log(err);
        },
      });
  }

  updateReview() {
    if (!this.updateReviewContent || this.updateReviewContent.length < 2)
      return;
    this.reviewService
      .newContentReview(
        this.reviewIdUpdate,
        this.movie.id,
        this.updateReviewContent
      )
      .subscribe({
        next: (response) => {
          this.reloadPage();
        },
        error: (err: any) => {},
      });
  }

  reloadPage() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/movies/' + this.movie.title]);
  }

  reviews() {
    this.reviewService.getReviews(this.movie.id).subscribe({
      next: (response) => {
        this.allReviews = response;
      },
      error: (err: any) => {
        //console.log(err);
      },
    });
  }
}

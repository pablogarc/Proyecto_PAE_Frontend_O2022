import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovieService } from 'src/app/shared/services/movies/movie.service';
import { UserService } from 'src/app/shared/services/users/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  search: string = '';
  data: any = [];
  url: string = 'https://image.tmdb.org/t/p/w500';

  constructor(
    socialAuthService: SocialAuthService,
    private userService: UserService,
    private movieService: MovieService,
    private router: Router
  ) {
    socialAuthService.authState.subscribe((user) => {
      if (user) {
        this.userService.googleLogin(user.name, user.email).subscribe({
          next: (response) => {
            this.userService.setToken(response.token);
            this.userService.setCurrentUserId(response.id);
            this.router.navigate(['/movies']);
          },
          error: (err: any) => {
            //console.log(err);
          },
        });
      } else {
        console.log('Se cerro la sesion');
      }
    });
  }

  ngOnInit(): void {}

  logoutUser() {
    this.userService.logout();
    this.router.navigate(['/login']);
  }

  searchMovie(e?: any): void {
    this.movieService.getMovieByTitle(this.search).subscribe({
      next: (response) => {
        this.data = response;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  selectMovie(movie: any) {
    this.movieService.setCurrentMovie(movie);
  }
}

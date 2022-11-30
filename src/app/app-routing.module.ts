import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { MovieDetailsComponent } from './pages/movies/movie-details/movie-details.component';
import { MoviesComponent } from './pages/movies/movies.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { WatchListComponent } from './pages/watch-list/watch-list.component';
import { SignupComponent } from './pages/signup/signup.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { UnauthGuard } from './shared/guards/unauth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'movies', pathMatch: 'full' },
  //{ path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent, canActivate: [UnauthGuard] },
  { path: 'signup', component: SignupComponent, canActivate: [UnauthGuard] },
  { path: 'movies', component: MoviesComponent },
  { path: 'movies/:title', component: MovieDetailsComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  {
    path: 'watchlist',
    component: WatchListComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

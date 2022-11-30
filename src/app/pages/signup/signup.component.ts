import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/users/user.service';
import { WatchlistService } from 'src/app/shared/services/watchlist/watchlist.service';
WatchlistService;
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  name: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorFlag: boolean = false;
  errorMsg: string = '';

  constructor(
    private userService: UserService,
    private watchlistService: WatchlistService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  signup(e?: any): void {
    const reg = new RegExp('[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}');

    if (this.name.length < 3) {
      this.errorFlag = true;
      this.errorMsg = 'Name must be at least 3 characters';
      return;
    }
    if (!reg.test(this.email)) {
      this.errorFlag = true;
      this.errorMsg = 'Invalid email';
      return;
    }
    if (this.password.length < 6) {
      this.errorFlag = true;
      this.errorMsg = 'Password must be at least 6 characters';
      return;
    }
    if (this.password !== this.confirmPassword) {
      this.errorFlag = true;
      this.errorMsg = 'Error password and confirm password';
      return;
    }

    this.userService.signup(this.name, this.email, this.password).subscribe({
      next: (response) => {
        this.userService.setToken(response.token);
        this.userService.setCurrentUserId(response.id);
        this.createWatchlist(response.id);
        this.router.navigate(['/movies']);
      },
      error: (err: any) => {
        this.errorFlag = true;
        this.errorMsg = err.error;
      },
    });
  }

  createWatchlist(userId: string) {
    this.watchlistService.newWatchlist(userId).subscribe({
      next: (response) => {
        //console.log(response);
      },
      error: (err: any) => {
        this.errorFlag = true;
        this.errorMsg = err.error;
      },
    });
  }
}

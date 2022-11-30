import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/interfaces/user';
import { ReviewService } from 'src/app/shared/services/reviews/review.service';
import { UserService } from 'src/app/shared/services/users/user.service';
import { WatchlistService } from 'src/app/shared/services/watchlist/watchlist.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  googleAccount: boolean = false;

  errorFlag: boolean = false;
  errorMsg: string = '';

  descriptionFlag: boolean = true;
  imageFlag: boolean = true;
  passwordFlag: boolean = true;
  emailFlag: boolean = true;
  nameFlag: boolean = true;

  newName: string = '';
  newEmail: string = '';
  newPassword: string = '';
  newDescription: string = '';
  images: any;

  user: User = {
    _id: '',
    full_name: '',
    email: '',
    password: '',
    image: '',
    description: '',
    google: false,
  };

  constructor(
    private userService: UserService,
    private watchlistService: WatchlistService,
    private reviewService: ReviewService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    this.userService.getCurrentUser().subscribe({
      next: (response) => {
        if (response.google) this.googleAccount = true;

        if (!response.image) {
          response.image =
            'https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Free-Image.png';
        } else {
          response.image = `${environment.apiUrl}/assets/images/${response.image}`;
        }
        this.user = response;
      },
      error: (err: any) => {
        this.errorFlag = true;
        this.errorMsg = err.error;
      },
    });
  }

  changeDescriptionStatus() {
    this.descriptionFlag = false;
  }

  changeImageStatus() {
    this.imageFlag = false;
  }

  changePasswordStatus() {
    this.passwordFlag = false;
  }

  changeEmailStatus() {
    this.emailFlag = false;
  }

  changeNameStatus() {
    this.nameFlag = false;
  }

  selectImage(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.images = file;
    }
  }

  acceptChanges() {
    if (!this.nameFlag) {
      if (this.newName.length < 3) {
        this.errorFlag = true;
        this.errorMsg = 'Name must be at least 3 characters';
        return;
      }
      this.userService.updateUser(this.newName, 'name').subscribe({
        next: (response) => {
          this.cancelEdit();
        },
        error: (err: any) => {
          this.errorFlag = true;
          this.errorMsg = err.error;
        },
      });
    } else if (!this.emailFlag) {
      const reg = new RegExp(
        '[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}'
      );
      if (!reg.test(this.newEmail)) {
        this.errorFlag = true;
        this.errorMsg = 'Incorrect Email';
        return;
      }
      this.userService.updateUser(this.newEmail, 'email').subscribe({
        next: (response) => {
          this.cancelEdit();
        },
        error: (err: any) => {
          this.errorFlag = true;
          this.errorMsg = err.error;
        },
      });
    } else if (!this.passwordFlag) {
      if (this.newPassword.length < 6) {
        this.errorFlag = true;
        this.errorMsg = 'Password must be at least 6 characters';
        return;
      }
      this.userService.updateUser(this.newPassword, 'password').subscribe({
        next: (response) => {
          this.cancelEdit();
        },
        error: (err: any) => {
          this.errorFlag = true;
          this.errorMsg = err.error;
        },
      });
    } else if (!this.descriptionFlag) {
      this.userService
        .updateUser(this.newDescription, 'description')
        .subscribe({
          next: (response) => {
            this.cancelEdit();
          },
          error: (err: any) => {
            this.errorFlag = true;
            this.errorMsg = err.error;
          },
        });
    } else {
      const formData = new FormData();
      formData.append('file', this.images);

      this.userService.updateImage(formData).subscribe({
        next: (response) => {
          this.cancelEdit();
        },
        error: (err: any) => {
          this.errorFlag = true;
          this.errorMsg = err.error;
        },
      });
    }
  }

  cancelEdit() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/profile']);
  }

  delete() {
    this.userService.deleteUser().subscribe({
      next: (response) => {
        this.watchlistService.deleteWatchlist().subscribe({
          next: (response) => {
            this.reviewService.deleteReviews().subscribe({
              next: (response) => {
                localStorage.clear();
                this.router.navigate(['/login']);
              },
              error: (err: any) => {
                //console.log(err);
              },
            });
          },
          error: (err: any) => {
            //console.log(err);
          },
        });
      },
      error: (err: any) => {
        //console.log(err);
      },
    });
  }
}

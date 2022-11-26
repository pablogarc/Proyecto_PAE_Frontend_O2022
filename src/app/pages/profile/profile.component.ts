import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/interfaces/user';
import { UserService } from 'src/app/shared/services/users/user.service';
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

  constructor(private userService: UserService, private router: Router) {}

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

  selectImage(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.images = file;
    }
  }

  acceptChanges() {
    if (!this.descriptionFlag) {
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
}

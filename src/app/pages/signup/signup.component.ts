import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/users/user.service';

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

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {}

  signup(e?: any): void {
    if (this.password !== this.confirmPassword) {
      this.errorFlag = true;
      this.errorMsg = 'Error password and confirm password';
      return;
    }

    this.userService.signup(this.name, this.email, this.password).subscribe({
      next: (response) => {
        this.userService.setToken(response.token);
        this.userService.setCurrentUserId(response.id);
        this.router.navigate(['/movies']);
      },
      error: (err: any) => {
        this.errorFlag = true;
        this.errorMsg = err.error;
      },
    });
  }
}

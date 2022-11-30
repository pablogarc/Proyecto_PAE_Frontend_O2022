import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/users/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  errorFlag: boolean = false;
  errorMsg: string = '';

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {}

  login(e?: any): void {
    const reg = new RegExp('[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}');
    if (!reg.test(this.email)) {
      this.errorFlag = true;
      this.errorMsg = 'Invalid request';
      return;
    }
    if (this.password.length < 6) {
      this.errorFlag = true;
      this.errorMsg = 'Invalid request';
      return;
    }
    this.userService.login(this.email, this.password).subscribe({
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

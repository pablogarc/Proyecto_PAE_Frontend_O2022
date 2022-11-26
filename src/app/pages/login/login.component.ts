import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/users/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: string = "";
  password: string = "";
  errorFlag: boolean = false;
  errorMsg: string = "";


  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  login(e?: any): void {
    this.userService.login(this.email, this.password).subscribe({
      next: (response) => {
        this.userService.setToken(response.token);
        this.userService.setCurrentUserId(response.id);
        this.router.navigate(['/movies']);
      },
      error: (err: any) => {
        this.errorFlag = true;
        this.errorMsg = err.error;
      }
    });
  }

}

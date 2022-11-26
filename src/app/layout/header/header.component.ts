import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/users/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(
    socialAuthService: SocialAuthService,
    private userService: UserService,
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
            console.log(err);
          }
        });
      } else {
        console.log('Se cerro la sesion');
      }
    });
  }

  ngOnInit(): void {}
}

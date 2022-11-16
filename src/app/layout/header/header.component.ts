import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(socialAuthService: SocialAuthService) { 
    socialAuthService.authState.subscribe(user => {
      if(user) {
        console.log("Usuario logueado", user);
      } else {
        console.log("Se cerro la sesion");
      }
    })
  }

  ngOnInit(): void {
  }

}

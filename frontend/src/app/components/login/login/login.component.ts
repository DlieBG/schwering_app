import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login/login.service';
import { TitleService } from 'src/app/services/title/title.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  pin!: number;

  constructor(
    private titleService: TitleService,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.titleService.setAppName('Login');
    
    this.loginService.getLoginJwt().subscribe((user) => {
      console.log(user)
    });
  }

  login() {
    this.loginService.login(this.pin).subscribe((jwt) => {
      this.loginService.setJwt(jwt.jwt);
    });
  }

}

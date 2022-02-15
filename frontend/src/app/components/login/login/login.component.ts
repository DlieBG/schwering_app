import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';
import { TitleService } from 'src/app/services/title/title.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  pin!: number;

  error: boolean = false;

  constructor(
    private router: Router,
    private titleService: TitleService,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.titleService.setAppName('Login');
  }

  login() {
    this.loginService.login(this.pin).subscribe({
      next: (jwt) => {
        this.loginService.setJwt(jwt.jwt);
        this.router.navigate(['/']);
        this.error = false;
      },
      error: (error) => {
        this.error = true;
        console.error(error);
      }
    });
  }

}

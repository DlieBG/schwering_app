import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/services/login/login.service';
import { TitleService } from 'src/app/services/title/title.service';
import { LoginJwt } from 'src/app/types/login.type';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  loginJwt$!: Observable<LoginJwt>;
  loginJwt!: LoginJwt;

  constructor(
    private titleService: TitleService,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.titleService.setAppName('Benutzer');
    this.getLoginJwt();
  }

  getLoginJwt() {
    this.loginJwt$ = this.loginService.getLoginJwt();
    this.loginJwt$.subscribe({
      next: (loginJwt: LoginJwt) => {
        this.loginJwt = loginJwt;
      }
    });
  }

}

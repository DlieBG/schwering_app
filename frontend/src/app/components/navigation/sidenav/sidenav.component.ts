import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login/login.service';
import { AppService } from 'src/app/services/app/app.service';
import { Observable } from 'rxjs';
import { LoginJwt } from 'src/app/types/login.type';
import { App } from 'src/app/types/app.type';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  loginJwt$!: Observable<LoginJwt>;
  loginJwt!: LoginJwt;

  apps$!: Observable<App[]>;
  apps!: App[];

  constructor(
    private loginService: LoginService,
    private appService: AppService
  ) { }

  ngOnInit(): void {
    this.getLoginJwt();
    this.getApps();
  }

  getLoginJwt() {
    this.loginJwt$ = this.loginService.getLoginJwt();
    this.loginJwt$.subscribe({
      next: (loginJwt: LoginJwt) => {
        this.loginJwt = loginJwt;
      }
    });
  }

  getApps() {
    this.apps$ = this.appService.getApps();
    this.apps$.subscribe({
      next: (apps: App[]) => {
        this.apps = apps;
      }
    });
  }

}

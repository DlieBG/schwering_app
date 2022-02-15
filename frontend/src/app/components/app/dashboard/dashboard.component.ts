import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppService } from 'src/app/services/app/app.service';
import { LoginService } from 'src/app/services/login/login.service';
import { TitleService } from 'src/app/services/title/title.service';
import { App } from 'src/app/types/app.type';
import { LoginJwt } from 'src/app/types/login.type';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  loginJwt$!: Observable<LoginJwt>;
  loginJwt!: LoginJwt;

  apps$!: Observable<App[]>;
  apps!: App[];

  constructor(
    private titleService: TitleService,
    private loginService: LoginService,
    private appService: AppService
  ) { }

  ngOnInit(): void {
    this.titleService.resetTitle();

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

import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AppService } from 'src/app/services/app/app.service';
import { LoginService } from 'src/app/services/login/login.service';
import { TitleService } from 'src/app/services/title/title.service';
import { App } from 'src/app/types/app.type';

@Component({
  selector: 'app-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  app$!: Observable<App>;
  app!: App;

  loading: boolean = true;

  @ViewChild('iframe', { static: true }) iframe: any;

  constructor(
    private route: ActivatedRoute,
    private titleService: TitleService,
    private loginService: LoginService,
    private appService: AppService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params) => {
        this.loading = true;

        if(this.iframe.nativeElement.src && this.iframe.nativeElement.src != '')
          this.iframe.nativeElement.src += '';

        if(params['appId'])
          this.getApp(params['appId']);
      }
    );
  }

  getApp(appId: string) {
    this.app$ = this.appService.getApp(appId);
    this.app$.subscribe({
      next: (app: App) => {
        this.app = app;
        this.iframe.nativeElement.src = `${app.url}?jwt=${this.loginService.getJwt()}`;
        this.titleService.setAppName(app.shortName);
      }
    });
  }

  loaded() {
    if(this.iframe.nativeElement.src && this.iframe.nativeElement.src != '')
      this.loading = false;
  }

}

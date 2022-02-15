import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AppService } from 'src/app/services/app/app.service';
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

  url!: SafeResourceUrl;

  constructor(
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private titleService: TitleService,
    private appService: AppService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.getApp(params['appId']);
    });
  }

  getApp(appId: string) {
    this.app$ = this.appService.getApp(appId);
    this.app$.subscribe({
      next: (app: App) => {
        this.app = app;
        this.url = this.sanitizer.bypassSecurityTrustResourceUrl(app.url);
        this.titleService.setAppName(app.shortName);
      }
    });
  }

}

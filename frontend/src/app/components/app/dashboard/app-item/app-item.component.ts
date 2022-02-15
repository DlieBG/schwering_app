import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { App } from 'src/app/types/app.type';

@Component({
  selector: 'app-app-item',
  templateUrl: './app-item.component.html',
  styleUrls: ['./app-item.component.scss']
})
export class AppItemComponent implements OnInit {

  @Input() app!: App;

  loading: boolean = true;

  @ViewChild('iframe', { static: true }) iframe: any;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.iframe.nativeElement.src = this.app.url;
  }

  loaded() {
    if(this.iframe.nativeElement.src)
      this.loading = false;
  }

  openApp() {
    this.router.navigate(['/app', this.app.appId]);
  }

}

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TitleService } from 'src/app/services/title/title.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private titleService: TitleService,
    private httpClient: HttpClient
  ) { }

  ngOnInit(): void {
    this.titleService.resetTitle();
  }

}

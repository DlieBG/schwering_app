import { Component, Input, OnInit } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { LoginService } from 'src/app/services/login/login.service';
import { TitleService } from 'src/app/services/title/title.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input() drawer!: MatDrawer;

  title: string = '';

  constructor(
    private titleService: TitleService
  ) { }

  ngOnInit(): void {
    this.titleService.title.subscribe(title => this.title = title);
  }

}

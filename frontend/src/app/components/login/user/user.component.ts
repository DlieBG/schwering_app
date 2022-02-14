import { Component, OnInit } from '@angular/core';
import { TitleService } from 'src/app/services/title/title.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor(
    private titleService: TitleService
  ) { }

  ngOnInit(): void {
    this.titleService.setAppName('Benutzer');
  }

}

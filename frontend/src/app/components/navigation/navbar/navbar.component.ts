import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDrawer } from '@angular/material/sidenav';
import { TitleService } from 'src/app/services/title/title.service';
import { JokeComponent } from 'src/app/components/utils/joke/joke.component';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input() drawer!: MatDrawer;

  title: string = '';

  constructor(
    private titleService: TitleService,
    private dialog: MatDialog,
    private httpClient: HttpClient
  ) { }

  ngOnInit(): void {
    this.titleService.title.subscribe(title => this.title = title);
  }

  showJoke() {
    this.httpClient
      .get<{ text: string }>(`${environment.api}/joke`)
      .pipe(map(res => res.text))
      .subscribe(
        (joke) => {
          this.dialog.open(JokeComponent, { 
            data: joke,
            autoFocus: false
          })
        }
      );
  }

}
function JokeDialogComponent(JokeDialogComponent: any) {
  throw new Error('Function not implemented.');
}


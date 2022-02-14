import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TitleService {

  title: Subject<string> = new Subject<string>();

  constructor(
    private htmlTitle: Title
  ) { }

  setAppName(name: string) {
    this.title.next(name);
    this.htmlTitle.setTitle(`${name} - Schwering App`);
  }

  resetTitle() {
    this.title.next('');
    this.htmlTitle.setTitle('Schwering App');
  }

}
